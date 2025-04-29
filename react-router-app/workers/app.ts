/**
 * Main entry point for the Cloudflare Worker app
 */

import { createRequestHandler } from "react-router";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> { 

    // 通常のリクエストは React Router のハンドラに渡す
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
