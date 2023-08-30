import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import size from "rollup-plugin-size";
import preserveDirectives from "rollup-plugin-preserve-directives";

const babelPlugin = babel({
  babelHelpers: "bundled",
  exclude: /node_modules/,
  extensions: [".ts", ".tsx", ".native.ts"],
});

export default function rollup() {
  return [
    {
      external: ["axios"],
      input: "src/index.ts", // 入口文件路径
      output: {
        format: "esm", // 输出的模块格式为ESM
        file: "build/lib/index.mjs", // 输出的.mjs文件路径
        sourcemap: true, // 生成sourcemap文件
      },
      plugins: [
        babelPlugin,
        commonJS(),
        nodeResolve({ extensions: [".ts", ".tsx", ".native.ts"] }),
        preserveDirectives(),
      ],
    },
    {
      external: ["axios"],
      input: "src/index.ts", // 入口文件路径
      output: {
        format: "esm",
        file: "build/lib/index.esm.js",
        sourcemap: true,
      },
      plugins: [
        babelPlugin,
        commonJS(),
        nodeResolve({ extensions: [".ts", ".tsx", ".native.ts"] }),
        preserveDirectives(),
      ],
    },
    {
      external: ["axios"],
      input: "src/index.ts", // 入口文件路径
      output: {
        format: "cjs",
        file: "build/lib/index.js",
        sourcemap: true,
        exports: "named",
      },
      plugins: [
        babelPlugin,
        commonJS(),
        nodeResolve({ extensions: [".ts", ".tsx", ".native.ts"] }),
        preserveDirectives(),
      ],
    },
    {
      external: ["axios"],
      input: "src/index.ts", // 入口文件路径
      output: {
        format: "umd",
        sourcemap: true,
        file: "build/lib/umd/index.development.js",
        name: "UniwebService",
        globals: {
          axios: "axios",
        },
      },
      plugins: [
        babelPlugin,
        commonJS(),
        nodeResolve({ extensions: [".ts", ".tsx", ".native.ts"] }),
        terser({
          mangle: true,
          compress: true,
        }),
        size({}),
      ],
    },
    {
      external: ["axios"],
      input: "src/index.ts", // 入口文件路径
      output: {
        format: "umd",
        sourcemap: true,
        file: "build/lib/umd/index.production.js",
        name: "UniwebService",
        globals: {
          axios: "axios",
        },
      },
      plugins: [
        babelPlugin,
        commonJS(),
        nodeResolve({ extensions: [".ts", ".tsx", ".native.ts"] }),
        terser({
          mangle: true,
          compress: true,
        }),
        size({}),
      ],
    },
  ];
}
