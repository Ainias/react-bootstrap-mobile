const path = require('path');
const webpack = require('webpack');
// const PrettierPlugin = require('prettier-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const getPackageJson = require('./scripts/getPackageJson');

const { version, name, license, repository, author } = getPackageJson(
    'version',
    'name',
    'license',
    'repository',
    'author'
);

const banner = `
  ${name} v${version}
  ${repository.url}
  Copyright (c) ${author.replace(/ *<[^)]*> */g, ' ')} and project contributors.
  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = (env) => {
    return {
        mode: env.production ? 'production' : 'development',
        devtool: env.production ? 'source-map' : 'eval-source-map',
        entry: './bootstrapReactMobile.ts',
        output: {
            filename: 'bootstrapReactMobile.js',
            path: path.resolve(__dirname, 'dist'),
            library: { type: 'commonjs-static' },
            clean: true,
            globalObject: 'this',
        },
        externals: {
            react: 'commonjs react',
            'react-dom': 'commonjs react-dom',
            'isomorphic-style-loader': 'commonjs2 isomorphic-style-loader',
            '@fortawesome/react-fontawesome': 'commonjs2 @fortawesome/react-fontawesome',
            '@fortawesome/fontawesome-svg-core': 'commonjs2 @fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons': 'commonjs2 @fortawesome/free-solid-svg-icons',
            'react-beautiful-dnd': 'commonjs2 react-beautiful-dnd',
            'react-hook-form': 'commonjs2 react-hook-form',
        },
        optimization: {
            minimize: false,
            minimizer: [new TerserPlugin({ extractComments: false })],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    exclude: /(node_modules)/,
                    use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
                },
                {
                    //Compiliert SASS zu CSS und speichert es in Datei
                    test: /\.scss$/,
                    use: [
                        { loader: 'isomorphic-style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                esModule: false,
                                modules: {
                                    localIdentName: '[local]__[hash:base64:5]',
                                    exportLocalsConvention: 'camel-case'
                                },
                            },
                        },
                        { loader: 'sass-loader' },
                    ],
                },
            ],
        },
        plugins: [
            // new PrettierPlugin(),
            // new MiniCssExtractPlugin({
            //     filename: 'css/index.css',
            // }),
            new webpack.BannerPlugin(banner),
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
    };
};
