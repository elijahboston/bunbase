import { ALLOWED_ORIGINS } from "./constants";
import { onRequest } from "firebase-functions/v2/https";
import { helloWorldService } from "./hello-world-service";
import { elysiaToFirebase } from "@packages/elysia-firebase-bridge";

export const helloWorld = onRequest(
  {
    cors: ALLOWED_ORIGINS,
  },
  elysiaToFirebase(helloWorldService)
);