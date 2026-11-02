FROM node:22.23.4-bookworm-slim
WORKDIR /workspace
USER node
EXPOSE 8080
CMD ["node", "scripts/serve.mjs"]
