# babel-plugin-react-code-block [![NPM][npm-img]][npm-url] [![Coverage][cov-img]][cov-url]

Display React functional examples with source code.

## Table of Contents

*   [Installation](#installation)
*   [Documentation](#documentation)
*   [Contributing](#contributing)
*   [License](#license)

## Installation

**npm**

```bash
npm install babel-plugin-react-code-block
```

**yarn**

```bash
yarn add babel-plugin-react-code-block
```

## Documentation

Create a code block component with a `code` property, which will be populated by this plugin:
```js
import React from 'react'

export default ({children, code}) => {
  return (
    <div>
      {children}
      <code>{code}</code>
    </div>
  )
}
```

> Note: In the above example component children is the passed in JSX that you want to render as a demo and code is the passed in JSX converted to a string so you can also print the code sample (which is run through prettier to make it look aesthetically pleasing).

In your Babel configuration include:
```js
module.exports = {
  "plugins": [
    [
      "babel-plugin-react-code-block",
      {
        "component": "CodeBlock",
      },
    ],
  ],
}
```

> Note: In the above configuration change `CodeBlock` to the name of your code block component. This plugin will simply apply the transform to any JSX elements matching the component name.

## Contributing

Please see the [contributing guide](CONTRIBUTING.md).

## License

[MIT](LICENSE.md)

[cov-img]: https://img.shields.io/codecov/c/github/dogma-io/babel-plugin-react-code-block.svg "Code Coverage"
[cov-url]: https://codecov.io/gh/dogma-io/babel-plugin-react-code-block

[npm-img]: https://img.shields.io/npm/v/babel-plugin-react-code-block.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/babel-plugin-react-code-block
