//开发环境
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//提取公共代码
const webpack = require('webpack')

module.exports = {
    //入口
    entry: {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname,'src/index.js')
        ],
        vendor: ['react','react-router-dom','react-dom']
    },
    output:{
        path: path.join(__dirname,'./dist'),
        filename: "[name].[hash].js",
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
                use: ["style-loader","css-loader"]
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
    //增加webpack-dev-server 配置
    devServer: {
        contentBase: path.join(__dirname,'./dist'),
        historyApiFallback: true,
        port: 8080,
        host: '0.0.0.0'
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
    devtool: 'inline-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname,'src/index.html')
        }),
        //提取公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        })
    ]
};