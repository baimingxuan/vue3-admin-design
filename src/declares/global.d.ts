declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
}
