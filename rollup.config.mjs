import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import autoprefixer from "autoprefixer";
import path from "path";
import postcss from "rollup-plugin-postcss";

import packageJson from "./package.json" assert { type: "json" };

const pcss = postcss({
  modules: true,
  extensions: [".sass", ".scss"],
  namedExports: true,
  plugins: [autoprefixer],
  use: [
    [
      "sass",
      {
        includePaths: [path.resolve("node_modules")],
      },
    ],
  ],
});

export default [
  {
    input: "src/index.ts",
    external: ["react-dom"],
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
      "",
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      // scss({
      //   output: "dist/index.css",
      //   failOnError: true,
      //   runtime: sass,
      //   includePaths: ["node_modules"],
      // }),
      //   scss({
      //     processor: () => postcss([autoprefixer()]),
      //     // includePaths: [
      //     //   path.join(__dirname, "../../node_modules/"),
      //     //   "node_modules/",
      //     // ],
      //     include: ["node_modules"],
      //   }),
      pcss,
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.scss$/],
  },
];
