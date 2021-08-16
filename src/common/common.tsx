import { Spinner } from "reactstrap";
import * as React from "react";

export const spinner = () => <Spinner type="grow" color="dark" />;

export interface Post {
  id: string;
  title: string;
  body: string;
}

export enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  READY = "ready",
  ERROR = "error",
}
