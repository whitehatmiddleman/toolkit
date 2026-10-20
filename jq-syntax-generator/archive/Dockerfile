FROM node:22-alpine
# node:22-alpine: small base image with LTS Node.js, no npm packages needed

WORKDIR /app
COPY . /app
# no npm install — only Node.js built-ins (http, fs, path, child_process) are used

EXPOSE 3000
CMD ["node", "test.js"]
