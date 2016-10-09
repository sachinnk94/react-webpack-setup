var webpack 			= require('webpack');
var HtmlWebpackPlugin 	= require('html-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-eval-source-map',

	entry: {
		app: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/dev-server',
			'./src/index.js',
		],
		vendor: [
			'react',
			'react-dom',
		],
	},

	output: {
		path: __dirname,
		pathinfo: true,
		filename: 'app.js',
		publicPath: '/',
	},

	resolve: {
		extensions: ['', '.js', '.jsx'],
		modules: [
			'src',
			'node_modules',
		],
	},

	devServer: {
		stats: 'errors-only'
	},

	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			}, {
				test: /\.jsx?$/,
				exclude: [/node_modules/, /.+\.config.js/],
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}, {
				test: /\.(jpe?g|gif|png|svg)$/i,
				loader: 'url-loader?limit=10000'
			}, {
				test: /\.json$/,
				loader: 'json-loader'
			},
		],
	},

	plugins: [
		// Generates an `index.html` file with the <script> injected.
		new HtmlWebpackPlugin({
			inject: true,
			template: 'index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'vendor.js',
		}),
		new webpack.DefinePlugin({
			'process.env': {
			CLIENT: JSON.stringify(true),
			'NODE_ENV': JSON.stringify('development'),
			}
		}),
	]
};
