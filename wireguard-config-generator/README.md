# WireGuard Config Generator

A single-file, **100% offline** generator that produces matched WireGuard
configurations for both the **server** and one or more **clients**. Dark themed,
zero dependencies, no build step, and no server — all key generation happens in
your browser.

## Usage

Open `index.html` directly in a browser (`file://`) or serve it statically:

```bash
# from the repo root
python3 -m http.server 8080
# then visit http://localhost:8080/wireguard-config-generator/
```

1. Fill in the **Server** details (public endpoint, port, tunnel address, DNS).
2. Add/remove **Clients** (each with its own name) and set the allowed-IPs /
   keepalive options.
3. Click **Generate Configurations**.
4. For each config you can **Copy**, **Download .conf**, or use
   **Copy for QR generator** (client configs) — paste that text into any QR code
   generator, then scan it with the WireGuard mobile app.

Apply a config on Linux with:

```bash
wg-quick up ./wg0-server.conf
```

## Features

- Curve25519 (X25519) keypairs generated in-page — identical to `wg genkey` /
  `wg pubkey`. The implementation is verified against the RFC 7748 test vectors.
- Optional preshared keys for an extra symmetric layer.
- Add/remove any number of named clients with auto-incrementing tunnel IPs.
  Each name is used in config comments and download filenames, and each client
  is added as a `[Peer]` on the server and given its own complete client config.
- Optional NAT/forwarding `PostUp`/`PostDown` iptables rules for the server.
- Full-tunnel or split-tunnel via the **Allowed IPs** field.
- Copy to clipboard, download individual `.conf` files, or download a single
  bundle of all configs.
- No QR images are generated; the app gives you copy-paste-ready text for any
  external QR generator (per design).

## Privacy / offline

No network requests are made. Private keys are generated locally with
`crypto.getRandomValues` and never leave the page. Save the file and run it
fully offline.
