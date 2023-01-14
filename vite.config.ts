import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // ...vite configures
  server: {
    // vite server configs, for details see \[vite doc\](https://vitejs.dev/config/#server-host)
    port: 3000,
  },
  plugins: [
    viteCommonjs(),
    tsconfigPaths(),
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      exportName: 'App',
      tsCompiler: 'esbuild',
    }),
  ],
  build: {
    target: 'modules',
  },
  optimizeDeps: {
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-swagger',
    ],
    esbuildOptions: {
      plugins: [esbuildCommonjs(['@slack/bolt'])],
    },
  },
});
