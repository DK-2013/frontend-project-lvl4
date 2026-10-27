import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Vite-конфигурация.
// - в production собираем в dist/public c base "/assets/" (fastify-static отдаёт префикс /assets),
//   с фиксированными именами main.js / main.css — их ожидает server/views/index.pug;
// - в dev поднимаем сервер на 8080 с base "/", чтобы entry можно было грузить напрямую
//   с http://localhost:8080/src/index.js.
export default ({ command }) => {
  const isBuild = command === 'build';

  return {
    base: isBuild ? '/assets/' : '/',
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: [
        // webpack-externals `gon` → глобальная переменная из pug-шаблона
        { find: /^gon$/, replacement: path.resolve(dirname, 'src/gon.js') },
      ],
    },
    server: {
      port: 8080,
      strictPort: true,
      cors: true,
    },
    build: {
      outDir: path.resolve(dirname, 'dist/public'),
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        input: path.resolve(dirname, 'src/index.js'),
        output: {
          entryFileNames: 'main.js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'main.css';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api'],
        },
      },
    },
  };
};
