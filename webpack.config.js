const path = require('path');

module.exports = {
  target: 'node',                              // Target Node.js environment
  entry: './dist/index.js',                     // Entry file (can be .ts or .mjs)
  output: {
    filename: 'index.mjs',                    // Output file name
    path: path.resolve(__dirname, 'dist'),     // Output directory
    libraryTarget: 'module',                   // Output as an ES module
  },
  experiments: {
    outputModule: true                         // Enable ES module output
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js'],        // Resolve .ts, .mjs, and .js files
  },
  module: {
    rules: [
      {
        test: /\.ts$/,                         // Process .ts files
        use: 'ts-loader',                      // Use ts-loader for TypeScript
        exclude: /(node_modules|dist)/,
      },
      {
        test: /\.mjs$/,                        // Process .mjs files
        type: 'javascript/esm',                // Treat .mjs as ES modules
      },
    ],
  },
  mode: 'production',                          // Set to 'production' for optimized output
  externalsType: 'module',                     // Externals should be treated as ESM
  externalsPresets: { node: true },            // Exclude Node.js built-ins (like fs, path)
};