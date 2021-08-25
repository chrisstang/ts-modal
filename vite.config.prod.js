// @ts-check
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'TsModal',
            fileName: format => 'ts-modal.min.js',
            formats: ['iife']
        },
        rollupOptions: {
            output: {
                // Since we publish our ./src folder, there's no point
                // in bloating sourcemaps with another copy of it.
                sourcemapExcludeSources: true,
            },
        },
        emptyOutDir: false,
        sourcemap: true,
        // Reduce bloat from legacy polyfills.
        target: 'esnext',
    }
})