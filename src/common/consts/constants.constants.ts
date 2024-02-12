export namespace constants {
  export namespace env {
    export const TEST = "test";
    export const DEV = "development";
    export const LOCAL = "local";
    export const TENCENT = "tencent";
    export const STAGING = "staging";
    export const PRODUCTION = "production";
  }
  export namespace date {
    export const DefaultDateFormat = "MM/DD/YYYY HH:mm:ss";
  }
  export namespace pagination {
    export const MIN_PAGE_NO = 1;
    export const MIN_PAGE_SIZE = 1;
    export const DEFAULT_PAGE_SIZE = 20;
  }
}

export default constants;
