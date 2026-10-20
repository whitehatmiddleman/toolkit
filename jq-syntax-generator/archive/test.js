'use strict';
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

// ── inline the pure functions (mirrors index.html logic) ───────────────

function isSimpleKey(key) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
}

function buildChildPath(parentPath, key, isIndex) {
  const prefix = parentPath === '.' ? '' : parentPath;
  if (isIndex) return prefix + '.[' + key + ']';
  if (isSimpleKey(String(key))) return prefix + '.' + key;
  const escaped = String(key).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return prefix + '.["' + escaped + '"]';
}

function tokenizePath(jqPath) {
  const tokens = [];
  let i = 1;
  while (i < jqPath.length) {
    if (jqPath[i] === '.') { i++; continue; }
    if (jqPath[i] === '[') {
      const closeIdx = jqPath.indexOf(']', i);
      if (closeIdx === -1) throw new Error('Malformed path: unclosed [');
      const inner = jqPath.slice(i + 1, closeIdx);
      i = closeIdx + 1;
      if (inner.startsWith('"') && inner.endsWith('"')) {
        const key = inner.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        tokens.push({ type: 'key', value: key });
      } else {
        const idx = parseInt(inner, 10);
        if (isNaN(idx)) throw new Error('Malformed path: invalid index "' + inner + '"');
        tokens.push({ type: 'index', value: idx });
      }
    } else {
      let j = i;
      while (j < jqPath.length && jqPath[j] !== '.' && jqPath[j] !== '[') j++;
      if (j === i) { i++; continue; }
      tokens.push({ type: 'key', value: jqPath.slice(i, j) });
      i = j;
    }
  }
  return tokens;
}

function evaluatePath(json, jqPath) {
  if (jqPath === '.') return { ok: true, value: json };
  let tokens;
  try { tokens = tokenizePath(jqPath); }
  catch (e) { return { ok: false, error: e.message }; }
  let current = json;
  for (const token of tokens) {
    if (token.type === 'key') {
      if (current === null || typeof current !== 'object' || Array.isArray(current)) {
        return { ok: false, error: 'Expected object for key "' + token.value + '"' };
      }
      if (!(token.value in current)) return { ok: false, error: 'Key not found: "' + token.value + '"' };
      current = current[token.value];
    } else {
      if (!Array.isArray(current)) return { ok: false, error: 'Expected array at index ' + token.value };
      if (token.value < 0 || token.value >= current.length) return { ok: false, error: 'Index out of bounds: ' + token.value };
      current = current[token.value];
    }
  }
  return { ok: true, value: current };
}

// ── unit tests ─────────────────────────────────────────────────────────

let pass = 0;
let fail = 0;

function assert(desc, actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log('  PASS ' + desc);
    pass++;
  } else {
    console.error('  FAIL ' + desc);
    console.error('       got:      ' + JSON.stringify(actual));
    console.error('       expected: ' + JSON.stringify(expected));
    fail++;
  }
}

console.log('\n=== buildChildPath ===');
assert('simple key from root',        buildChildPath('.', 'foo', false),       '.foo');
assert('array index from root',       buildChildPath('.', 0, true),            '.[0]');
assert('nested simple key',           buildChildPath('.foo', 'bar', false),    '.foo.bar');
assert('nested array index',          buildChildPath('.foo', 0, true),         '.foo.[0]');
assert('key with space',              buildChildPath('.', 'foo bar', false),   '.["foo bar"]');
assert('key with double-quote',       buildChildPath('.', 'say "hi"', false),  '.["say \\"hi\\""]');
assert('key with backslash',          buildChildPath('.', 'a\\b', false),      '.["a\\\\b"]');
assert('deep path nested key',        buildChildPath('.foo.[2]', 'baz', false),'.foo.[2].baz');
assert('underscore key (simple)',     buildChildPath('.', '_id', false),       '._id');
assert('dollar key (simple)',         buildChildPath('.', '$ref', false),      '.$ref');
assert('key starting with digit',     buildChildPath('.', '2fast', false),    '.["2fast"]');

console.log('\n=== evaluatePath ===');
const sampleJson = {
  user: { id: 42, name: 'Alice', tags: ['admin', 'editor'] },
  'key with space': 'bracket demo',
  count: 0,
  active: true,
  nothing: null
};

assert('root (.)',                evaluatePath(sampleJson, '.'),                   { ok: true, value: sampleJson });
assert('.user',                   evaluatePath(sampleJson, '.user'),               { ok: true, value: sampleJson.user });
assert('.user.id',                evaluatePath(sampleJson, '.user.id'),            { ok: true, value: 42 });
assert('.user.name',              evaluatePath(sampleJson, '.user.name'),          { ok: true, value: 'Alice' });
assert('.user.tags',              evaluatePath(sampleJson, '.user.tags'),          { ok: true, value: ['admin', 'editor'] });
assert('.user.tags.[0]',          evaluatePath(sampleJson, '.user.tags.[0]'),      { ok: true, value: 'admin' });
assert('.user.tags.[1]',          evaluatePath(sampleJson, '.user.tags.[1]'),      { ok: true, value: 'editor' });
assert('.["key with space"]',     evaluatePath(sampleJson, '.["key with space"]'), { ok: true, value: 'bracket demo' });
assert('.count (zero)',           evaluatePath(sampleJson, '.count'),              { ok: true, value: 0 });
assert('.active (bool)',          evaluatePath(sampleJson, '.active'),             { ok: true, value: true });
assert('.nothing (null)',         evaluatePath(sampleJson, '.nothing'),            { ok: true, value: null });
assert('missing key → error',    evaluatePath(sampleJson, '.missing').ok,         false);
assert('index on non-array → error', evaluatePath(sampleJson, '.user.[0]').ok,    false);
assert('key on array → error',   evaluatePath(sampleJson, '.user.tags.x').ok,     false);

const roundTripJson = { 'a b': [{ c: 1 }, { c: 2 }] };
assert('round-trip: bracket + index + key',
  evaluatePath(roundTripJson, buildChildPath(buildChildPath(buildChildPath('.', 'a b', false), 1, true), 'c', false)),
  { ok: true, value: 2 }
);

console.log('\n=== Results ===');
console.log('  ' + pass + ' passed, ' + fail + ' failed');
if (fail > 0) {
  process.exit(1);
}

// ── server integration test ────────────────────────────────────────────

console.log('\n=== Server integration ===');
const serverProc = spawn('node', [path.join(__dirname, 'server.js')], { stdio: ['ignore', 'pipe', 'pipe'] });
let done = false;

function finish(code, msg) {
  if (done) return;
  done = true;
  serverProc.kill();
  console.log('  ' + msg);
  process.exit(code);
}

serverProc.stdout.on('data', (chunk) => {
  const text = chunk.toString();
  if (text.includes('running')) {
    http.get('http://127.0.0.1:3000/', (res) => {
      let body = '';
      res.on('data', c => { body += c; });
      res.on('end', () => {
        if (res.statusCode === 200 && body.includes('JQ Syntax Generator')) {
          finish(0, 'PASS  HTTP 200, title found in response');
        } else {
          finish(1, 'FAIL  unexpected response (status=' + res.statusCode + ')');
        }
      });
    }).on('error', (err) => finish(1, 'FAIL  HTTP request failed: ' + err.message));
  }
});

serverProc.stderr.on('data', (chunk) => {
  process.stderr.write('server stderr: ' + chunk);
});

serverProc.on('error', (err) => finish(1, 'FAIL  could not start server: ' + err.message));

setTimeout(() => finish(1, 'FAIL  server did not report ready within 5s'), 5000);
