export interface AppRouteDefinition {
  guarded: boolean;
  path: string;
  Component: any;
}

export interface GlobalState {
  auth: any;
}
