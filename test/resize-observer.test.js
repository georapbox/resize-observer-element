import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { ResizeObserverElement } from '../src/resize-observer.js';

ResizeObserverElement.defineCustomElement();

describe('<resize-observer>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture(html`<resize-observer></resize-observer>`);
    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture(html`<resize-observer></resize-observer>`);

    expect(el.disabled).to.be.false;
    expect(el.getAttribute('disabled')).to.be.null;
  });

  it('change default properties', async () => {
    const el = await fixture(html`<resize-observer disabled></resize-observer>`);

    expect(el.disabled).to.be.true;
    expect(el.getAttribute('disabled')).to.equal('');
  });

  it('change properties programmatically', async () => {
    const el = await fixture(html`<resize-observer></resize-observer>`);

    el.disabled = true;

    await elementUpdated(el);

    expect(el.disabled).to.be.true;
    expect(el.getAttribute('disabled')).to.equal('');
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
