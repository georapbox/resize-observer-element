const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/resize-observer-defined.js' : '../lib/resize-observer-defined.js';
const toggleObserverButton = document.getElementById('toggleObserver');
const resizableEl = document.getElementById('resizeElement');
const resizeObserverEl = document.querySelector('resize-observer');

import(componentUrl);

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

function handleToggleObserverButtonClick(evt) {
  resizeObserverEl.disabled = !resizeObserverEl.disabled;
  evt.target.textContent = `${resizeObserverEl.disabled ? 'Enable' : 'Disable'} observer`;
}

async function handleDOMContentLoaded() {
  window.hljs.highlightAll();

  try {
    const interact = (await import('https://cdn.interactjs.io/v1.10.11/interactjs/index.js')).default;
    resizableEl.classList.remove('resizable--loading');

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
          min: { width: 250, height: 220 },
          max: { width: 1000, height: 500 }
        })
      ]
    });
  } catch (err) {
    console.error('Error loading interact.js:', err);
  }
}

resizeObserverEl.addEventListener('resize-observer:resize', handleResize);
toggleObserverButton.addEventListener('click', handleToggleObserverButtonClick);
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
