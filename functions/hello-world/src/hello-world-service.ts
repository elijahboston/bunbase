import { Elysia } from "elysia";
import { BUCKET_NAME } from "./constants";
import { initializeApp } from "firebase-admin/app";

initializeApp({
  storageBucket: BUCKET_NAME,
});

const app = new Elysia();

export const helloWorldService = app
  .get("/", async () => {
    return {
      message: "Hello, world!",
    };
  }).handle;