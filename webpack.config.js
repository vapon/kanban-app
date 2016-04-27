const path = require('path')
const webpack = require('webpack');
const merge = require('webpack-merge');

const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, "app"),
    build: path.join(__dirname, "build")
};

const common = {
    entry: [
        PATHS.app
    ],  
   output: {
       path: PATHS.build,
       filename: 'bundle.js'
   },
   module: {
       loaders: [
         {
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: PATHS.app
        },
        {
            test: /\.jsx?$/,
            loaders: ['babel?cacheDirectory'],
            include: PATHS.app
        }
      ]
   }
 }
 
 if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            
            // stats: 'errors-only',
            
            host: process.env.HOST,
            port: process.env.PORT || 3000
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({save: true})
        ]
    });
 }
    
 if(TARGET === 'build') {
    module.exports = merge(common, {});
 }