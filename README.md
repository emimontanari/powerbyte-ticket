 
### Prerequisites

**Node version 18.7.x**

### Install packages

```shell
npm i
```

### Setup .env file
```js
DATABASE_URL=
DIRECT_URL=

AUTH_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
```

### Setup Prisma
```shell
npx prisma generate
npx prisma db push
```
### Docker Compose
```bash
docker compose build
docker compose up
```


### Docker Buildx

```bash
 docker buildx build --platform linux/amd64,linux/arm64 \
 -t emimontanari/mercurio:latest --push .
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
