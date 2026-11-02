FROM node:22.23.4-bookworm-slim@sha256:4b150b48b4116e2a22f2c39cc27025fbf4f153e2078fd3b14d159fdb5c7279da
RUN mkdir -p /opt/tools && chown node:node /opt/tools
WORKDIR /opt/tools
COPY --chown=node:node tools/package.json tools/package-lock.json ./
USER node
RUN npm ci --ignore-scripts --no-audit --no-fund
ENV PATH="/opt/tools/node_modules/.bin:${PATH}" HOME=/tmp
WORKDIR /workspace
CMD ["shopify", "version"]
