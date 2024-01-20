module.exports = {
    entry: {
        A: {
            import: './src/entries/entryA.ts',
        },
        B: {
            import: './src/entries/entryB.ts',
        },
    },
    devtool: 'hidden-source-map',
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                components: {
                    test: /[\\/]src[\\/]components[\\/]/,
                    name: 'components',
                    enforce: true
                },
                dll: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'dll',
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: () => `runtime`,
        }
    },
};