//生产环境
//开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、
//具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。
//而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。
//由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//提取公共代码
const webpack = require('webpack')
//压缩文件
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
//抽取公共css
const ExtractTextPlugin  =require("extract-text-webpack-plugin");

module.exports = {
    //入口
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname,'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    output:{
        path: path.join(__dirname,'./dist'),
        filename: "[name].[chunkhash].js",
        //chunkFilename是除了entry定义的入口js之外的js
        chunkFilename: "[name].[chunkhash].js"
    },
    //解析src文件夹的js 文件
    //acheDirectory是用来缓存编译结果，下次编译加速
    module:{
        rules: [
            //解析js文件
            {
                test: /\.js$/,
                use: ["babel-loader?cacheDirectory=true"],
                include: path.join(__dirname,"src")
            },
            //解析css文件
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            //解析png|jpg|gif格式的图片
            //options limit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    },
    //devtool优化
    devtool: 'cheap-module-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname,'src/index.html')
        }),
        //提取公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            name: 'runtime'
        }),
        new UglifyJSPlugin(),
        //指定环境
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV':JSON.stringify('production')
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true
        })
    ]
};