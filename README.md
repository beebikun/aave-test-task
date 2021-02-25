# Aave test task

## Run

```
docker-compose up
```

## Task

### Tech stack:
- Nest.JS + some ORM over PostgreSQL;
- React;

### Description
In the blockchain world, we have stuff called "NFT". Broadly speaking it's a regular asset (like an image) that is represented in blockchain as some token.
We want to make a demo app to list them on WEB. NFTs are available via SubGraph API: https://thegraph.com/explorer/subgraph/wighawag/eip721-subgraph
So, the task would be to build fullstack application, which:
- Gets n NFTs via SubGraph API (graphql) and put it into DB;
- Serve it on some URL (simple backend);
- Showing it on frontend (single page webapp)

### Goals
- The easiest solution (proof of concept level, no extra optimizations needed)
- Be easy to deploy (packed with docker)
