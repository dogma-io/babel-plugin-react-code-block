import {transform} from '@babel/core'

function t(code, options) {
  options = options || {component: 'CodeBlock'}

  return transform(code, {
    plugins: [[require('../../lib/'), options]],
    presets: ['@babel/env', '@babel/react'],
  })
}

describe('babel-plugin-react-code-block', () => {
  it('should throw if component option is missing', () => {
    expect(() => {
      t('<CodeBlock />', {})
    }).toThrow(
      /babel-plugin-react-code-block expects component option to be present and to be a string/,
    )
  })

  it('should throw if component option is not a string', () => {
    expect(() => {
      t('<CodeBlock />', {component: 1})
    }).toThrow(
      /babel-plugin-react-code-block expects component option to be present and to be a string/,
    )
  })

  it('should inject code for code block component with children', () => {
    expect(
      t(
        'var a = <CodeBlock><div className="foobar" onClick={() => {}} /></CodeBlock>',
      ),
    ).toMatchSnapshot()
  })

  it('should inject code for code block component with children and use maxLineLength attribute with prettier', () => {
    expect(
      t(
        'var a = <CodeBlock maxLineLength={10}><div className="foobar" onClick={() => {}} /></CodeBlock>',
      ),
    ).toMatchSnapshot()
  })

  it('should not inject code for code block component without children', () => {
    expect(t('var a = <CodeBlock code="foobar" />')).toMatchSnapshot()
  })

  it('should not touch non-code block component component', () => {
    expect(
      t('var a = <NotCodeBlock><div><span /></div></NotCodeBlock>'),
    ).toMatchSnapshot()
  })
})
