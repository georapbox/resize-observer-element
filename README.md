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
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
  <p>Quas quo aliquam iure ipsa laborum! Deleniti doloremque quaerat sunt, esse fugit.</p>
  <p>Molestias, libero laborum minus facere ullam iusto eius in adipisci quaerat autem placeat quisquam.</p>
</resize-observer>
```

## API

### Properties
| Name | Reflects | Type | Default | Description |
| ---- | -------- | ---- | ------- | ----------- |
| `disabled` | ✓ | Boolean | `false` | Defines if the resize observer is disabled or not. |

### Slots

| Name | Description |
| ---- | ----------- |
| (default) | The default slot where the elements to observe are placed. |

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `defineCustomElement` | Static | Defines/registers the custom element with the name provided. If no name is provided, the default name is used. The method checks if the element is already defined, hence will skip trying to redefine it. | `elementName='resize-observer'` |

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `resize-observer:resize` | Emitted when the element is resized. | `{ entries: ResizeObserverEntry[]` |

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
