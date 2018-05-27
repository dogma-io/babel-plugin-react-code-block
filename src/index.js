/**
 * @flow
 */

const prettier = require('prettier')

// eslint-disable-next-line flowtype/no-weak-types
module.exports = ({types: t, template}: *, options: any): any => {
  if (typeof options.component !== 'string') {
    throw new TypeError(
      'babel-plugin-react-code-block expects component option to be present and to be a string',
    )
  }

  return {
    visitor: {
      JSXElement(path: *, stats: *) {
        const {children, openingElement} = path.node
        const {attributes} = openingElement
        const {name} = openingElement.name

        if (name === options.component) {
          if (children.length) {
            const {start} = children[0]
            const {end} = children[children.length - 1]
            const code = stats.file.code.slice(start, end)
            // eslint-disable-next-line flowtype/no-weak-types
            const options: Object = {
              parser: 'babylon',
            }
            const maxLineLengthAttribute = attributes.find(
              (attr: *): boolean => attr.name.name === 'maxLineLength',
            )

            if (maxLineLengthAttribute) {
              options.printWidth = maxLineLengthAttribute.value.expression.value
            }

            const lines = prettier
              .format(`<div>${code}</div>`, options)
              .split('\n')

            // Remove wrapping div that we added to keep prettier from breaking
            lines.pop() // Remove empty newline
            lines.pop() // Remove </div>
            lines.shift() // Remove <div>

            // Trim two spaces from each line so everything is at the correct
            // indentation. The join is an escaped newline character so newlines
            // end up in the final DOM.
            const finalCode = lines
              .map((line: string): string => line.substr(2))
              .join('\\n')

            attributes.push(
              t.jSXAttribute(
                t.jSXIdentifier('code'),
                t.stringLiteral(finalCode),
              ),
            )
          }
        }
      },
    },
  }
}
