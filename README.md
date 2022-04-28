[![npm version](https://img.shields.io/npm/v/@georapbox/resize-observer-element.svg)](https://www.npmjs.com/package/@georapbox/resize-observer-element)
[![npm license](https://img.shields.io/npm/l/@georapbox/resize-observer-element.svg)](https://www.npmjs.com/package/@georapbox/resize-observer-element)

[demo]: https://georapbox.github.io/resize-observer-element/
[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements
[license]: https://georapbox.mit-license.org/@2022
[changelog]: https://github.com/georapbox/resize-observer-element/blob/main/CHANGELOG.md

# &lt;resize-observer&gt; element

A custom element that offers a declarative interface to the [ResizeObserver API](https://developer.mozilla.org/docs/Web/API/ResizeObserver).

[API documentation](#api) &bull; [Demo][demo]

## Install

```sh
$ npm install --save @georapbox/resize-observer-element
```

## Usage

### Script

```js
import { ResizeObserverElement } from './node_modules/@georapbox/resize-observer-element/dist/resize-observer.min.js';

// Manually define the element.
ResizeObserverElement.defineCustomElement();
```

Alternatively, you can import the automatically defined custom element.

```js
import './node_modules/@georapbox/resize-observer-element/dist/resize-observer-defined.min.js';
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

## Browser support

Browsers without native [custom element support][support] require a [polyfill][polyfill].

- Firefox
- Chrome
- Microsoft Edge
- Safari

## License

[The MIT License (MIT)][license]
