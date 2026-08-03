/* ==========================================================================
   KDP MAFIA - Interactive Anti-AI-Slop Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initFAQ();
  initStickyBar();
  initVideoPlayer();
  initDimeSaleTicker();
  initPreviewerSimulator();
  initSalesPopups();
});

/* 1. Countdown Timer */
function initCountdown() {
  const timerElements = document.querySelectorAll('.timer-display');
  let duration = 14 * 60 + 59;

  function updateTimer() {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    timerElements.forEach(el => {
      if (el) el.textContent = formatted;
    });

    if (duration > 0) duration--;
    else duration = 14 * 60 + 59;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* 2. FAQ Accordion Handler */
function initFAQ() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const question = item.querySelector('.accordion-q');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(other => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 3. Sticky Bottom CTA Bar */
function initStickyBar() {
  const stickyBar = document.getElementById('stickyBar');
  if (!stickyBar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      stickyBar.style.transform = 'translateY(0)';
    } else {
      stickyBar.style.transform = 'translateY(100%)';
    }
  });
}

/* 4. VSL Player */
function initVideoPlayer() {
  const playBtn = document.getElementById('playBtn');
  const vslContainer = document.getElementById('vslInner');

  if (playBtn && vslContainer) {
    playBtn.addEventListener('click', () => {
      vslContainer.innerHTML = `
        <iframe 
          src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
          title="KDP Mafia Demo" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="position: absolute; top:0; left:0; width:100%; height:100%; border-radius:18px;"
        ></iframe>
      `;
    });
  }
}

/* 5. Dime-Sale Live Ticker */
function initDimeSaleTicker() {
  const priceDisplays = document.querySelectorAll('.dime-price');
  let basePrice = 17.00;

  setInterval(() => {
    basePrice += 0.05;
    if (basePrice > 19.95) basePrice = 17.00;

    priceDisplays.forEach(el => {
      el.textContent = `$${basePrice.toFixed(2)}`;
    });
  }, 18000);
}

/* 6. Signature Component: Interactive KDP Print Previewer Status Simulator */
function initPreviewerSimulator() {
  const simItems = document.querySelectorAll('.sim-item');
  if (simItems.length === 0) return;

  // Pulse glow effect on spec items
  let idx = 0;
  setInterval(() => {
    simItems.forEach(item => item.style.borderColor = '#34d399');
    if (simItems[idx]) {
      simItems[idx].style.borderColor = '#fbbf24';
    }
    idx = (idx + 1) % simItems.length;
  }, 2500);
}

/* 7. Live Sales Notifications */
function initSalesPopups() {
  const sales = [
    { name: "David M.", location: "United States", book: "Word Search & Sudoku" },
    { name: "Sarah K.", location: "United Kingdom", book: "Kids Activity Book" },
    { name: "Rahul S.", location: "India", book: "Low-Content Planners" },
    { name: "Marcus P.", location: "Australia", book: "Ebook & Cover Studio" },
    { name: "Elena V.", location: "Germany", book: "Coloring Book Suite" }
  ];

  let idx = 0;

  const popup = document.createElement('div');
  popup.style.cssText = `
    position: fixed;
    bottom: 90px;
    left: 20px;
    background: #ffffff;
    border: 2px solid #f59e0b;
    border-radius: 14px;
    padding: 16px 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 14px;
    z-index: 998;
    transform: translateX(-150%);
    transition: transform 0.5s ease;
    max-width: 350px;
    font-family: var(--font-body);
  `;

  document.body.appendChild(popup);

  function triggerPopup() {
    const item = sales[idx];
    popup.innerHTML = `
      <div style="width: 42px; height: 42px; background: #dcfce7; color: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.1rem; flex-shrink:0;">✓</div>
      <div>
        <div style="font-size: 0.95rem; font-weight: 800; color: #0b0f19;">${item.name} (<span style="color: #d97706;">${item.location}</span>)</div>
        <div style="font-size: 0.82rem; color: #64748b;">Unlocked KDP Mafia (${item.book}) • Just now</div>
      </div>
    `;

    popup.style.transform = 'translateX(0)';

    setTimeout(() => {
      popup.style.transform = 'translateX(-150%)';
    }, 4500);

    idx = (idx + 1) % sales.length;
  }

  setTimeout(() => {
    triggerPopup();
    setInterval(triggerPopup, 12000);
  }, 3500);
}
