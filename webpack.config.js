const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',

	output: {
		filename: './js/bundle.js',
		path: path.resolve(__dirname, './build')
	},

	devServer: {
		overlay: true
	},

	devtool: 'cheap-module-eval-source-map',

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'postcss-loader',
						options: { sourceMap: true, config: { path: 'postcss.config.js' } }
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					},
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: "url-loader",
					options: {
						name: "[name].[ext]",
						outputPath: 'fonts/'
					}
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'img/'
					}
				}
			}
		]
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new HtmlWebpackPlugin({
			filename: 'form.html',
			template: 'src/form.html'
		}),
		new HtmlWebpackPlugin({
			filename: 'photo.html',
			template: 'src/photo.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css'
		}),
		new CopyWebpackPlugin([
			{from: './src/img', to: './img'},
			{from: './src/fonts', to: './fonts'},
			{from: './src/static', to: './static'}
		])
	],
	resolve: {
		extensions: ['.js', '.json', '.jsx', '*']
	}
};
