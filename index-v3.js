// V3 only: native anchors, native FAQ disclosure, and an illustrative calculator.
const bookRange = document.getElementById('shelf-books');
if (bookRange) {
  const updateShelfMaths = () => {
    const books = Number(bookRange.value);
    document.getElementById('shelf-count').value = books;
    document.getElementById('shelf-royalty').textContent = new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(books * ((9.99 * 0.6) - 2.84));
  };
  bookRange.addEventListener('input', updateShelfMaths);
  updateShelfMaths();
}

// Desktop exit intent: show once per tab session when the pointer leaves at the top.
(() => {
  const dialog = document.getElementById('v3-exit-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const storageKey = 'booknexa-v3-exit-shown';
  let shown = false;
  let pointerEntered = false;
  try { shown = sessionStorage.getItem(storageKey) === '1'; } catch {}
  const closeOffer = () => dialog.close();
  document.addEventListener('mousemove', () => { pointerEntered = true; }, { once: true });
  document.addEventListener('mouseout', (event) => {
    if (shown || !pointerEntered || event.relatedTarget || event.clientY > 10 || dialog.open || document.visibilityState !== 'visible') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    // Let a checkout click open its destination without another offer.
    shown = true;
    try { sessionStorage.setItem(storageKey, '1'); } catch {}
    dialog.showModal();
    document.documentElement.classList.add('v3-exit-open');
  });
  dialog.querySelector('.v3-exit-close').addEventListener('click', closeOffer);
  dialog.querySelector('.v3-exit-dismiss').addEventListener('click', closeOffer);
  dialog.querySelector('.v3-exit-cta').addEventListener('click', closeOffer);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeOffer();
  });
  dialog.addEventListener('close', () => document.documentElement.classList.remove('v3-exit-open'));
  document.querySelectorAll('a[href*="/product/checkout/"]').forEach((link) => {
    link.addEventListener('click', () => {
      shown = true;
      try { sessionStorage.setItem(storageKey, '1'); } catch {}
    });
  });
})();
