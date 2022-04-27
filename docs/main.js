import interact from 'https://cdn.interactjs.io/v1.10.11/interactjs/index.js';
// import { ResizeObserverElement } from 'https://unpkg.com/@georapbox/resize-observer-element/dist/resize-observer-defined.min.js';
import '../src/resize-observer-defined.js';

const observerStatus = document.getElementById('observerStatus');
const resizeObserverEl = document.querySelector('resize-observer');

function handleResize(evt) {
  console.log('resize-observer:resize ->', evt.detail);

  const entry = evt.detail.entries[0];
  const target = entry.target;
  const widthEl = target.querySelector('code.width');
  const heightEl = target.querySelector('code.height');

  if (widthEl) {
    widthEl.innerHTML = `width: ${Math.ceil(entry.contentRect.width)}px`;
  }

  if (heightEl) {
    heightEl.innerHTML = `height: ${Math.ceil(entry.contentRect.height)}px`;
  }
}

resizeObserverEl.addEventListener('resize-observer:resize', handleResize);

document.addEventListener('DOMContentLoaded', () => {
  interact('#resizeElement').resizable({
    edges: { right: true, bottom: true },
    listeners: {
      move(evt) {
        evt.target.style.width = `${evt.rect.width}px`;
        evt.target.style.height = `${evt.rect.height}px`;
      }
    },
    modifiers: [
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),
      interact.modifiers.restrictSize({
        min: { width: 200, height: 220 },
        max: { width: 1000, height: 500 }
      })
    ]
  });

  document.getElementById('toggleObserver').addEventListener('click', evt => {
    resizeObserverEl.disabled = !resizeObserverEl.disabled;

    if (resizeObserverEl.disabled) {
      evt.target.textContent = 'Enable observer';
      observerStatus.textContent = 'disabled';
      observerStatus.className = 'error';
    } else {
      evt.target.textContent = 'Disable observer';
      observerStatus.textContent = 'enabled';
      observerStatus.className = 'success';
    }
  });
});
