import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: path.join(__dirname, 'src/index.ts'),
  output: {
    file: path.join(__dirname, 'index.js'),
    format: 'cjs',
  },
  plugins: [
    json(),
    commonjs(),
    nodeResolve(),
    typescript(),
    terser(),
  ],
};
