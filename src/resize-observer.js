const template = document.createElement('template');

template.innerHTML = /* html */`
  <style>:host { display: contents; }</style>
  <slot></slot>
`;

class ResizeObserverElement extends HTMLElement {
  #slotEl;
  #resizeObserver;
  #observedElements;

  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.#slotEl = this.shadowRoot.querySelector('slot');
    this.#resizeObserver = null;
    this.#observedElements = [];
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled' && oldValue !== newValue) {
      this.disabled ? this.#stopObserver() : this.#startObserver();
    }
  }

  connectedCallback() {
    this.#upgradeProperty('disabled');

    if ('ResizeObserver' in window) {
      this.#resizeObserver = new ResizeObserver(entries => {
        this.dispatchEvent(new CustomEvent('resize-observer:resize', {
          bubbles: true,
          composed: true,
          detail: { entries }
        }));
      });

      if (!this.disabled) {
        this.#startObserver();
      }

      this.#slotEl.addEventListener('slotchange', this.#onSlotChange);
    }
  }

  disconnectedCallback() {
    this.#stopObserver();
    this.#slotEl.removeEventListener('slotchange', this.#onSlotChange);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  #startObserver() {
    if (!this.#slotEl || !this.#resizeObserver) {
      return;
    }

    this.#observedElements.forEach(el => this.#resizeObserver.unobserve(el));
    this.#observedElements = [];

    this.#slotEl.assignedElements().forEach(el => {
      this.#resizeObserver.observe(el);
      this.#observedElements.push(el);
    });
  }

  #stopObserver() {
    this.#resizeObserver && this.#resizeObserver.disconnect();
  }

  #onSlotChange = () => {
    if (!this.disabled) {
      this.#startObserver();
    }
  };

  #upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  static defineCustomElement(elementName = 'resize-observer') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, ResizeObserverElement);
    }
  }
}

export { ResizeObserverElement };
