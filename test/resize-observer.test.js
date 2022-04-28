import { elementUpdated, expect, fixture, fixtureCleanup, html, aTimeout, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
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

    // toggle properties
    el.disabled = false;

    await elementUpdated(el);

    expect(el.disabled).to.be.false;
    expect(el.getAttribute('disabled')).to.be.null;
  });

  it('resize-observer:resize event is emitted', async () => {
    const el = await fixture(html`
      <resize-observer>
        <div class="container">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </div>
      </resize-observer>
    `);

    document.querySelector('.container').style.width = '100px';

    const { detail } = await oneEvent(el, 'resize-observer:resize');

    expect(detail.entries[0]).to.be.instanceOf(ResizeObserverEntry);
  });

  it('resize-observer:resize event is not emitted if disabled', async () => {
    const el = await fixture(html`
      <resize-observer disabled>
        <div class="container">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </div>
      </resize-observer>
    `);

    const handler = sinon.spy();

    el.addEventListener('resize-observer:resize', handler);

    document.querySelector('.container').style.width = '100px';

    await aTimeout(200);

    expect(handler).to.not.have.been.calledOnce;
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
