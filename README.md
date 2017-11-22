# Nunjucks Isomorphic loader for webpack

Nunjucks loader for webpack, supporting both javascript templating and generating static HTML files through the HtmlWebpackPlugin.

Completely rewritten, now (mostly) error free. Supports context file (.js only) for passing data.

This loader supports the following extensions: `.njk`, `.nunjucks`, `.html`, `.tpl`, `.tmpl`

## Installation

This loader need [`nunjucks`](https://www.npmjs.com/package/nunjucks) as a peer dependency. Versions >= 2.5.0 <= 4.0.0 are accepted. If you do not have nunjucks already installed, first run:

Using yarn:

```
yarn add nunjucks -D
```

Using npm:

```
npm install nunjucks -D
```

If you have nunjucks installed, you can then install the loader.

Using yarn:

```
yarn add nunjucks-isomorphic-loader -D
```

Using npm:

```
npm install nunjucks-isomorphic-loader -D
```

## Usage

Basic usage of this loader with `html-webpack-plugin`

```
module: {
  rules: [
    {
      test: /\.(njk|nunjucks|html|tpl|tmpl)$/,
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
    customData: { foo: 'bar' },
    filename: 'list.html',
    template: 'path/to/template.njk'
  })
]
```

Accessing data from the templates with the above config of `html-webpack-plugin`

`path/to/template.njk` :

```
{% set vars = htmlWebpackPlugin.options.customData %}

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ vars.foo }}</title>{# outputs 'bar' #}
  </head>
  <body>
    <header class="header">
    {% block header %}
      <h1 class="header-logo">
        <a href="#">{{ vars.foo }}</a>{# outputs 'bar' #}
      </h1>
    {% endblock %}
    </header>

    {% block content %}
      <section>
        <p>I was generated with html-webpack-plugin and nunjucks-isomorphic-loader!</p>
      </section>
    {% endblock %}
  </body>
</html>

