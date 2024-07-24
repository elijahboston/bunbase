# BunBase

Bun + 🔥 Firebase + 🐱 ElysiaJS

# Why?

Bun gives us:

- Zero-transpilation
- Monorepo support
- No messy Typescript config
- No need to compile workspace dependencies or generate types

Want to define a new package?

```
cd packages
bun init

# package.json
{
  "depdendencies": {
    "my-package": "workspace: *"
  }
}

bun install
```

Done.

Using Bun lets us take advantage of Elysia (written natively in Bun), which give us:

- [Strongly typed request and response schemas](https://elysiajs.com/essential/schema.html)
- [Auto-generated strongly typed client](https://elysiajs.com/eden/treaty/overview.html)
- [Extendable context](https://elysiajs.com/essential/context.html#extending-context)

Combined with Firebase's ease of deployment and scalability we have a stack that eliminates the overhead and hackery of traditional NodeJS monorepos, especially when used with Firebase.

# How it works

1. Define our functions using Elysia.
2. Use `elysia-firebase-bridge` to map Elysia's request handler to Firebase function's signature.
3. Use [Bun build](https://bun.sh/docs/bundler) in watch mode to generate a Node-compatible runtime on change.
4. Point Firebase to the output of our functions via `firebase.json`. Note that this is the `/dist` directory, not the source directory. We use `predeploy.ts` to copy the package.json of the function into `/dist` and strip out `dependencies/devDependencies/peerDependencies`, as they are not necessary.

# Setup

1. Create .firebaserc

```
{
  "projects": {
    "default": "my-cool-project"
  }
}
```

2. `bun install`
3. Set Firebase CLI project to use: `firebase use my-cool-project`
4. `bun run dev`

# Deploying

```
bun run deploy
```

This runs the deploy steps:

1. Use `bun run` to create a single index.js bundle and write it to `/dist`
2. Run `predeploy.ts` to copy and rewrite `package.json` to `/dist` and strip out depdendency properties.

# Making deployed functions public

```
gcloud functions add-iam-policy-binding YOUR_FUNCTION_NAME \
  --region=YOUR_REGION \
  --member="allUsers" \
  --role="roles/cloudfunctions.invoker"
```
