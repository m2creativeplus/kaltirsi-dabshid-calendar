/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as authActions from "../authActions.js";
import type * as crons from "../crons.js";
import type * as environmentTelemetry from "../environmentTelemetry.js";
import type * as events from "../events.js";
import type * as kaltirsi_engine from "../kaltirsi_engine.js";
import type * as references from "../references.js";
import type * as seed from "../seed.js";
import type * as seedKaltirsi from "../seedKaltirsi.js";
import type * as stories from "../stories.js";
import type * as systemConfig from "../systemConfig.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  authActions: typeof authActions;
  crons: typeof crons;
  environmentTelemetry: typeof environmentTelemetry;
  events: typeof events;
  kaltirsi_engine: typeof kaltirsi_engine;
  references: typeof references;
  seed: typeof seed;
  seedKaltirsi: typeof seedKaltirsi;
  stories: typeof stories;
  systemConfig: typeof systemConfig;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
