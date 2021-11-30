'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProduction = EmberApp.env() === 'production';

const purgeCSS = {
  module: require('@fullhuman/postcss-purgecss'),
  options: {
    content: [
      './app/index.html',
      './app/templates/**/*.hbs',
      './app/components/**/*.hbs',
    ],
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/.]+/g) || [],
  },
};

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        extension: 'scss',
        enabled: true,
        parser: require('postcss-scss'),
        plugins: [
          {
            module: require('@csstools/postcss-sass'),
            options: {
              path: ['node_modules'],
            },
          },
          require('tailwindcss')('./config/tailwind.js'),
          ...(isProduction ? [purgeCSS] : []),
        ],
      },
    },
  });

  // const { Webpack } = require('@embroider/webpack');
  // return require('@embroider/compat').compatBuild(app, Webpack, {
  //   skipBabel: [
  //     {
  //       package: 'qunit',
  //     },
  //   ],
  // });
  //
  return app.toTree();
};
