import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
const packageJson = await import('./package.json', { assert: { type: 'json' } });

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.default.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.default.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extensions: ['.scss'],
        use: [
          [
            'sass',
            {
              includePaths: ['./src/components/Grid'],
            },
          ],
        ],
      }),
    ],
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.scss$/],
  },
];