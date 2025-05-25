## How to setup a new Typescript + Express Project

```
1. npm init -y
```

```
2. npm install -D typescript
```

```
3. npx tsc --init
```

```
4. npm i concurrently
```

```
5. Add following in pkg.json -->
  "scripts": {
    "build": "npx tsc",
    "watch": "npx tsc -w",
    "prestart": "npm run build",
    "start": "npx nodemon dist/index.js",
    "dev": "npx concurrently --kill-others \"npm run watch\" \"npm start\""
  },
```

```
6. npm run dev
```
