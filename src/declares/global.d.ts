declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
}

declare interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
}
