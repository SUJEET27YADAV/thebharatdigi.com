import * as React from "react";

declare module "react/jsx-runtime" {
  export { Fragment, JSX } from "react";
  export function jsx(
    type: React.ElementType,
    props: unknown,
    key?: React.Key
  ): React.ReactElement;
  export function jsxs(
    type: React.ElementType,
    props: unknown,
    key?: React.Key
  ): React.ReactElement;
}

declare module "react/jsx-dev-runtime" {
  export { Fragment, JSX } from "react";
  export interface JSXSource {
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
  }
  export function jsxDEV(
    type: React.ElementType,
    props: unknown,
    key: React.Key | undefined,
    isStatic: boolean,
    source?: JSXSource,
    self?: unknown
  ): React.ReactElement;
}
