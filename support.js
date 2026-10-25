const passwordField = document.getElementById('starter-password');
const toggleButton = document.getElementById('toggle-password');
const copyButton = document.getElementById('copy-password');
const copyStatus = document.getElementById('copy-status');
let statusTimer;

toggleButton.addEventListener('click', () => {
  const reveal = passwordField.type === 'password';
  passwordField.type = reveal ? 'text' : 'password';
  toggleButton.textContent = reveal ? 'Hide' : 'Show';
  toggleButton.setAttribute('aria-pressed', String(reveal));
});

copyButton.addEventListener('click', async () => {
  let message;
  try {
    await navigator.clipboard.writeText(passwordField.value);
    message = 'Starter password copied.';
  } catch {
    passwordField.type = 'text';
    toggleButton.textContent = 'Hide';
    toggleButton.setAttribute('aria-pressed', 'true');
    passwordField.focus();
    passwordField.select();
    message = 'Copy unavailable. Your password is selected; copy it manually.';
  }
  clearTimeout(statusTimer);
  copyStatus.textContent = message;
  copyStatus.classList.add('show');
  statusTimer = setTimeout(() => copyStatus.classList.remove('show'), 4500);
});
