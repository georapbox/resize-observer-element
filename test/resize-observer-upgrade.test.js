import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { ResizeObserverElement } from '../src/resize-observer.js';

describe('<resize-observer> upgrading', () => {
  it('default properties', async () => {
    const el = await fixture(html`<resize-observer></resize-observer>`);

    // Update properties before upgrading
    el.disabled = true;

    // Upgrade custom element
    ResizeObserverElement.defineCustomElement();

    await elementUpdated(el);

    expect(el.getAttribute('disabled')).to.equal('');
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
