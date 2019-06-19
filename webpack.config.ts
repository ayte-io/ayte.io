import Path from 'path';
import Webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssExtractPlugin from 'mini-css-extract-plugin';

const Configuration = {
	mode: 'development',
	entry: './src/ts/index.ts',

	output: {
		filename: 'index.js',
		path: Path.resolve(__dirname, 'dist')
	},

	plugins: [
		new Webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			inject: false,
			template: 'src/html/index.html.ejs'
		}),
		new CssExtractPlugin({
			filename: 'style.css'
		})
	],

	module: {
		rules: [
			{
				test: /.(ts|tsx)?$/,
				loader: 'ts-loader',
				include: [Path.resolve(__dirname, 'dist')],
				exclude: [/node_modules/]
			},
			{
				test: /\.sass$/,
				use: [
					{
						loader: CssExtractPlugin.loader
					},
					'css-loader',
					'sass-loader'
				]
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};

export default Configuration;
