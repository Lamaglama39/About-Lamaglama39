import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  LinksFunction,
} from "react-router";

export interface Env {
  BLOG_FETCHER_URL?: string;
  // 他の環境変数があれば追加
}

export namespace Route {
  export type MetaArgs = Parameters<MetaFunction>[0];
  export type MetaFn = MetaFunction;
  export type LinksFn = LinksFunction;

  export interface LoaderArgs extends LoaderFunctionArgs {
    context: {
      cloudflare: {
        env: Env;
      };
    };
  }

  export interface ActionArgs extends ActionFunctionArgs {
    context: {
      cloudflare: {
        env: Env;
      };
    };
  }

  export type LoaderFunction = (
    args: LoaderArgs
  ) => Promise<Response> | Response | Promise<any> | any;

  export type ActionFunction = (
    args: ActionArgs
  ) => Promise<Response> | Response | Promise<any> | any;

  export interface ComponentProps {
    loaderData: Awaited<ReturnType<LoaderFunction>>;
    actionData?: Awaited<ReturnType<ActionFunction>>;
  }
} 