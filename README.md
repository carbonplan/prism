<img
  src='https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png'
  height='48'
/>

# carbonplan / prism

**syntax highlighting components**

[![GitHub][github-badge]][github]
[![Build Status]][actions]
![MIT License][]
![NPM Version][]

[github]: https://github.com/carbonplan/prism
[github-badge]: https://badgen.net/badge/-/github?icon=github&label
[build status]: https://github.com/carbonplan/prism/actions/workflows/main.yml/badge.svg
[actions]: https://github.com/carbonplan/prism/actions/workflows/main.yml
[mit license]: https://badgen.net/badge/license/MIT/blue
[npm version]: https://badgen.net/npm/v/@carbonplan/prism

Components for syntax highlighting using `prism`. Includes a `Code` component for rendering code and a `LiveCode` component for interactively editing JavaScript and viewing the results. Pairs well with MDX.

See these components demoed at [design.carbonplan.org](https://design.carbonplan.org).

## basic usage

To use as a standalone component, just provide the language and pass the code as children.

```jsx
import { Code, Live } from '@carbonplan/prism'

export const Index = () => {
  return <>
  	<Code language='python'>a = 2</Code>
  	<LiveCode language='jsx'>let a = 2</Code>
  </>
}
```

## usage with MDX

Import the component(s) you want and pass to an `MDXProvider`.

```jsx
import { MDXProvider } from '@mdx-js/react'
import { LiveCode, Pre } from '@carbonplan/prism'

const components = {
  code: LiveCode,
  pre: Pre,
}

return (
  <MDXProvider components={components}>
    ...
  </MDXProvider>
)
```

So long as you are using the `LiveCode` component, you can specify a `live` flag on a code fence in MDX and get a live code editor.

This will be rendered as normal code

````
```jsx
const a = 2
```
````

This will be rendered as a live code editor

````
```jsx live
const a = 2
```
````

## color schemes

Both the `Code` and `LiveCode` components take an optional `theme` property which specifies one of a fixed set of color themes via a string name. Here they are.

`monochrome`

`polychrome`

`triadic`

`warm`

`cool`

You can set the theme when definining the component, or as an optional variable inside a MDX code fence.

This will be rendered in the `monochrome` theme (the default)

````
```jsx
const a = 2
```
````

This will be rendered in the `polychrome` theme

````
```jsx theme=polychrome
const a = 2
```
````

When using MDX, you can set the `theme` once when declaring the component.

```jsx
import { MDXProvider } from '@mdx-js/react'
import { Code, Pre } from '@carbonplan/prism'

const components = {
  code: ({ ...props }) => <Code theme='polychrome' {...props}/>,
  pre: Pre,
}

return (
  <MDXProvider components={components}>
    ...
  </MDXProvider>
)
```

This will then apply to all code rendered via MDX. If you specify a different theme on an individual code fence, it will override the one set on the component.

## live code options

The `LiveCode` component also takes optional `scope` and `transform` properties. The `scope` specifies the variables you want to be available in the scope of the code editor, and the `transform` is a function to apply to code before execution. 

As an example, the following ensures that all code is interpreted as a React fragment unless it is a function, and adds `useState` to the scope. Note that we set these properties while defining the component passed to the `MDXProvider`.

```jsx
import { useState } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { LiveCode, Pre } from '@carbonplan/prism'

const transform = (src) => {
  if (!src.startsWith('()')) {
    return `<>${src}</>`
  } else {
    return `${src}`
  }
}

const scope = {
  useState,
}

const components = {
  code: ({...props}) => <LiveCode transform={transform} scope={scope} {...props}/>,
  pre: Pre,
}

return (
  <MDXProvider components={components}>
    ...
  </MDXProvider>
)
```

## development

To update a component and publish a new version, first make your changes, then follow these steps

- Increase the version number in `package.json`
- `npm run build`
- `npm publish`

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/) licensed, but we request that you please provide attribution if reusing any of our digital content (graphics, logo, articles, etc.).

## about us

CarbonPlan is a non-profit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of carbon removal and climate solutions through open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/components/issues/new) or [sending us an email](mailto:hello@carbonplan.org).
