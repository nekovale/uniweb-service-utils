export default function rollup(): ({
    external: string[];
    input: string;
    output: {
        format: string;
        file: string;
        sourcemap: boolean;
        exports?: undefined;
        name?: undefined;
        globals?: undefined;
    };
    plugins: import("rollup").Plugin[];
} | {
    external: string[];
    input: string;
    output: {
        format: string;
        file: string;
        sourcemap: boolean;
        exports: string;
        name?: undefined;
        globals?: undefined;
    };
    plugins: import("rollup").Plugin[];
} | {
    external: string[];
    input: string;
    output: {
        format: string;
        sourcemap: boolean;
        file: string;
        name: string;
        globals: {
            axios: string;
        };
        exports?: undefined;
    };
    plugins: any[];
})[];
//# sourceMappingURL=rollup.config.d.ts.map