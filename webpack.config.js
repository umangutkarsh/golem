const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		bundle: path.resolve(__dirname, 'app.vue'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		clean: true,
	},
	resolve: {
		fallback: {
			crypto: false,
		},
		extensions: ['.js', '.vue', '.ts', '.mjs', '.cjs', '.yml'],
	},
	stats: {
		errorDetails: true,
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: ['vue-loader'],
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(js)x?$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new BundleAnalyzerPlugin(),
		new HtmlWebpackPlugin({
			title: 'Vue Webpack App',
			filename: 'index.html',
			template: './public/index.html',
			templateParameters: {
				BASE_URL: process.env.BASE_URL || 'http://localhost:9000',
			},
		}),
		new webpack.DefinePlugin({
			'process.env.BASE_URL': JSON.stringify(
				process.env.BASE_URL || 'http://localhost:9000'
			),
		}),
	],
	// resolve: {
	//    alias: {
	//       'vue$': 'vue/dist/vue.esm.js',
	//    },
	// },
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		compress: true,
		hot: true,
		port: 9000,
	},
};
