// @ts-check

/**
 * Represents a value that may be of type T, or null.
 *
 * @template T
 * @typedef {T | null} Nullable
 */

const styles = /* css */ `:host { display: contents; }`;
const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles}</style>
  <slot></slot>
`;

/**
 * @summary A custom element that offers a declarative interface to the ResizeObserver API.
 * @documentation https://github.com/georapbox/resize-observer-element#readme
 *
 * @tagname resize-observer - This is the default tag name, unless overridden by the `defineCustomElement` method.
 *
 * @property {boolean} disabled - Whether the resize observer is disabled.
 *
 * @attribute {boolean} disabled - Reflects the disabled property.
 *
 * @slot - The default slot where the elements to observe are placed.
 *
 * @event resize-observer:resize - Dispatched when the observed elements are resized.
 *
 * @method defineCustomElement - Static method. Defines the custom element with the given name.
 */
class ResizeObserverElement extends HTMLElement {
  /** @type {Nullable<HTMLSlotElement>} */
  #slotEl = null;

  /** @type {Nullable<ResizeObserver>} */
  #resizeObserver = null;

  /** @type {Element[]} */
  #observedElements = [];

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.#slotEl = this.shadowRoot?.querySelector('slot') ?? null;
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled' && oldValue !== newValue) {
      this.disabled ? this.#stopObserver() : this.#startObserver();
    }
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('disabled');

    if ('ResizeObserver' in window) {
      this.#resizeObserver = new ResizeObserver(entries => {
        this.dispatchEvent(
          new CustomEvent('resize-observer:resize', {
            bubbles: true,
            composed: true,
            detail: { entries }
          })
        );
      });

      if (!this.disabled) {
        this.#startObserver();
      }

      this.#slotEl?.addEventListener('slotchange', this.#handleSlotChange);
    }
  }

  /**
   * Lifecycle method that is called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    this.#stopObserver();
    this.#slotEl?.removeEventListener('slotchange', this.#handleSlotChange);
  }

  /**
   * @type {boolean} - Whether the resize observer is disabled.
   * @default false
   * @attribute disabled - Reflects the disabled property.
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this.toggleAttribute('disabled', !!value);
  }

  /**
   * Starts observing the elements in the slot.
   */
  #startObserver() {
    if (!this.#slotEl || !this.#resizeObserver) {
      return;
    }

    this.#observedElements.forEach(el => this.#resizeObserver?.unobserve(el));
    this.#observedElements = [];

    this.#slotEl.assignedElements().forEach(el => {
      this.#resizeObserver?.observe(el);
      this.#observedElements.push(el);
    });
  }

  /**
   * Stops observing the elements in the slot.
   */
  #stopObserver() {
    this.#resizeObserver?.disconnect();
  }

  /**
   * Handles slot change event.
   */
  #handleSlotChange = () => {
    if (!this.disabled) {
      this.#startObserver();
    }
  };

  /**
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   *
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   *
   * @param {'disabled'} prop - The property name to upgrade.
   */
  #upgradeProperty(prop) {
    /** @type {any} */
    const instance = this;

    if (Object.prototype.hasOwnProperty.call(instance, prop)) {
      const value = instance[prop];
      delete instance[prop];
      instance[prop] = value;
    }
  }

  /**
   * Defines a custom element with the given name.
   * The name must contain a dash (-).
   *
   * @param {string} [elementName='resize-observer'] - The name of the custom element.
   * @example
   *
   * ResizeObserverElement.defineCustomElement('my-resize-observer');
   */
  static defineCustomElement(elementName = 'resize-observer') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, ResizeObserverElement);
    }
  }
}

export { ResizeObserverElement };
