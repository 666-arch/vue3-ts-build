/** 声明 vite 环境变量的类型 */
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: stirng;
    readonly VITE_BASE_API: string;
    readonly VITE_ROUTER_HISTORY: "hash" | "html5";
    readonly VITE_PUBLIC_PATH: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}