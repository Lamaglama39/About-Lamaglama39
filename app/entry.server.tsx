import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext
) {
  // URLからturbo-streamリクエストか判断
  const url = new URL(request.url);
  // turbo-streamのリクエストを検知（Accept ヘッダーやクエリパラメータから）
  const acceptHeader = request.headers.get("Accept") || "";
  const isTurboStream = acceptHeader.includes("turbo-stream") || 
                         url.searchParams.has("_data");
  
  // 通常のHTMLレスポンスを生成
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError(error: unknown) {
        responseStatusCode = 500;
        // Log streaming rendering errors from inside the shell.  Don't log
        // errors encountered during initial shell rendering since they'll
        // reject and get logged in handleDocumentRequest.
        if (shellRendered) {
          console.error(error);
        }
      },
    }
  );
  shellRendered = true;

  // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
  // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
  if ((userAgent && isbot(userAgent)) || routerContext.isSpaMode) {
    await body.allReady;
  }

  // コンテンツタイプをセット
  // データリクエストはJSONとして返す（React Router 7がハンドリングできる形式）
  if (url.pathname.includes("blog") && url.searchParams.has("_data")) {
    // データリクエストはJSONとして返す
    responseHeaders.set("Content-Type", "application/json");
  } else {
    // 通常のページレンダリングはHTMLとして返す
    responseHeaders.set("Content-Type", "text/html");
  }
  
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
