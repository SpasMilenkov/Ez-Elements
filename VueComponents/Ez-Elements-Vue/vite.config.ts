import { PluginOption, defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        visualizer({
            template: 'treemap', // or sunburst
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: 'analyse.html', // will be saved in project's root
        }) as PluginOption,
    ],
    build: {
        lib: {
            // src/indext.ts is where we have exported the component(s)
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'EzElementsVue',
            // the name of the output files when the build is run
            fileName: 'ez-elements-vue',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
