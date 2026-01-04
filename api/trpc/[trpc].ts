import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Convert Vercel request to Fetch API Request
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  
  const fetchRequest = new Request(url, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
  });

  const response = await fetchRequestHandler({
    endpoint: "/trpc",
    req: fetchRequest,
    router: appRouter,
    createContext: () => createContext({ req, res }),
  });

  // Convert Fetch API Response to Vercel Response
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  
  const body = await response.text();
  res.send(body);
}
