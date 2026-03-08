/**
 * Main entry point for the Cloudflare Worker app
 */

import { createRequestHandler } from "react-router";
import { updateBlogCache } from "./blogFetcher";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

    // 通常のリクエストはReact Routerのハンドラに渡す
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },

  async scheduled(
    _controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    ctx.waitUntil(updateBlogCache(env["about-lamaglama39-blog-cache"]));
  },
} satisfies ExportedHandler<Env>;
