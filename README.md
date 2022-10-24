<img
  src='https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png'
  height='48'
/>

# carbonplan / prism

**components for syntax highlighting**

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
import { Code, LiveCode } from '@carbonplan/prism'

export const Index = () => {
  return <>
  	<Code language='python'>a = 2</Code>
  	<LiveCode language='jsx' live>let a = 2</Code>
  </>
}
```

When using the `LiveCode` component you must specify the `live` flag to include the live editor. Otherwise it will render using the basic `Code` component as a fallback. We require setting the flag so that you can use the `LiveCode` component with MDX for a mix of both live and static code.

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

<img width="668" alt="CleanShot 2021-06-19 at 10 00 29@2x" src="https://user-images.githubusercontent.com/3387500/122649991-5b226100-d0e5-11eb-96db-29cb9a993e17.png">

`polychrome`

<img width="671" alt="CleanShot 2021-06-19 at 10 00 39@2x" src="https://user-images.githubusercontent.com/3387500/122650005-61184200-d0e5-11eb-8699-a369dc7d6179.png">

`triadic`

<img width="674" alt="CleanShot 2021-06-19 at 10 00 49@2x" src="https://user-images.githubusercontent.com/3387500/122650012-65dcf600-d0e5-11eb-9724-82129ee14c13.png">

`warm`

<img width="665" alt="CleanShot 2021-06-19 at 10 00 59@2x" src="https://user-images.githubusercontent.com/3387500/122650017-68d7e680-d0e5-11eb-9f06-3c1606e680af.png">

`cool`

<img width="669" alt="CleanShot 2021-06-19 at 10 01 08@2x" src="https://user-images.githubusercontent.com/3387500/122650023-6ffef480-d0e5-11eb-9587-f179f711f231.png">

You can set the `theme` once when definining the component, like this.

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

This will then apply to all code rendered via MDX. 

You can also specify a different theme on an individual code fence, which will override the one set on the component.

For example, this will be rendered in the `monochrome` theme

````
```jsx theme=monochrome
const a = 2
```
````

And this will be rendered in the `polychrome` theme

````
```jsx theme=polychrome
const a = 2
```
````

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

CarbonPlan is a non-profit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of climate solutions with open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/prism/issues/new) or [sending us an email](mailto:hello@carbonplan.org).
