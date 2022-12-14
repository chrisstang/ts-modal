// @ts-check
import { defineConfig } from 'vite'
import dts from 'vite-dts'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'TsModal',
        },
        rollupOptions: {
            output: {
                // Since we publish our ./src folder, there's no point
                // in bloating sourcemaps with another copy of it.
                sourcemapExcludeSources: true,
            },
        },
        sourcemap: true,
        // Reduce bloat from legacy polyfills.
        target: 'esnext'
    },
    plugins: [
        dts()
    ],
})