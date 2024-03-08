 
### Prerequisites

**Node version 18.7.x**

### Install packages

```shell
npm i
```

### Setup .env file
```js
AUTH_SECRET=
NEXT_PUBLIC_APP_URL=
NEXTAUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

RESEND_API_KEY=
DATABASE_URL=
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

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
