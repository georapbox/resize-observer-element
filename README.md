[![npm version](https://img.shields.io/npm/v/@georapbox/resize-observer-element.svg)](https://www.npmjs.com/package/@georapbox/resize-observer-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/resize-observer-element.svg)](https://www.npmjs.com/package/@georapbox/resize-observer-element)

[demo]: https://georapbox.github.io/resize-observer-element/
[license]: https://github.com/georapbox/resize-observer-element/blob/main/LICENSE
[changelog]: https://github.com/georapbox/resize-observer-element/blob/main/CHANGELOG.md

# &lt;resize-observer&gt;

A custom element that offers a declarative interface to the [ResizeObserver API](https://developer.mozilla.org/docs/Web/API/ResizeObserver).

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
$ npm install --save @georapbox/resize-observer-element
```

## Usage

### Script

```js
import { ResizeObserverElement } from './node_modules/@georapbox/resize-observer-element/dist/resize-observer.js';

// Manually define the element.
ResizeObserverElement.defineCustomElement();
```

Alternatively, you can import the automatically defined custom element.

```js
import './node_modules/@georapbox/resize-observer-element/dist/resize-observer-defined.js';
```

### Markup

```html
<resize-observer>
  <div>Element to observe for resizing</div>
</resize-observer>
```

## API

### Properties
| Name | Reflects | Type | Default | Description |
| ---- | -------- | ---- | ------- | ----------- |
| `disabled` | ✓ | Boolean | `false` | Defines if the resize observer is disabled or not. |

All of the above properties reflect their values as HTML attributes to keep the element's DOM representation in sync with its JavaScript state.

### Slots

| Name | Description |
| ---- | ----------- |
| (default) | The element(s) to observe. It can be one or more [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element). |

### Events

`resize-observer:resize` - Emitted when the element is resized. A list of [ResizeObserverEntry](https://developer.mozilla.org/docs/Web/API/ResizeObserverEntry) objects is attached to `event.detail`, with information about the target element and its dimensions.

```js
document.querySelector('resize-observer').addEventListener('resize-observer:resize', evt => {
  console.log(evt.detail); // => { entries: [ResizeObserverEntry] }
});
```

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Development setup

### Prerequisites

The project requires `Node.js` and `npm` to be installed on your environment. Preferrably, use [nvm](https://github.com/nvm-sh/nvm) Node Version Manager and use the version of Node.js specified in the `.nvmrc` file by running `nvm use`.

### Install dependencies

Install the project dependencies by running the following command.

```sh
npm install
```

### Build for development

Watch for changes and start a development server by running the following command.

```sh
npm start
```

### Linting

Lint the code by running the following command.

```sh
npm run lint
```

### Testing

Run the tests by running any of the following commands.

```sh
npm test
npm run test:watch # watch mode
```

### Build for production

Create a production build by running the following command.

```sh
npm run build
```

## License

[The MIT License (MIT)][license]
