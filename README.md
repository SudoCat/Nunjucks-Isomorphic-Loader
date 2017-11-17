# Nunjucks Isomorphic loader for webpack

Nunjucks loader for webpack, supporting both javascript templating and generating
static HTML files through the HtmlWebpackPlugin.

Completely rewritten, now (mostly) error free. Supports context file (.js only) for passing data.

This loader only supports `.njk` extension!

**Usage**

In webpack.config.js

```
module: {
  rules: [
    {
      test: /\.njk$/, // only supports .njk extension
      use: [
        {
          loader: 'nunjucks-isomorphic-loader',
          query: {
            root: [path.resolve(__dirname, 'path/to/templates/root')]
          }
        }
      ]
    }
  ]
},

plugins: [
  new HtmlWebpackPlugin({
    filename: 'list.html',
    template: 'path/to/template.njk'
  })
]
```
