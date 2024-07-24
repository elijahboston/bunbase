
import type { Request as FirebaseRequest } from "firebase-functions/v2/https";
import type { Response as FirebaseResponse } from "express";

// Bridge function to adapt Elysia handle to Firebase function signature
export const elysiaToFirebase = (
  elysiaHandler: (request: Request) => Promise<Response>
) => async (req: FirebaseRequest, res: FirebaseResponse) => {
  console.log("Request received", req.url);

  const fullUrl = `${req.protocol}://${req.headers.host}${req.url}`;

  const request = new Request(fullUrl, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: req.rawBody,
  });

  const response = await elysiaHandler(request);

  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.set(key, value);
  });
  res.send(await response.text());
};