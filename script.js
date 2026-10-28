const dialog = document.querySelector('.image-dialog');
const dialogImage = dialog.querySelector('.dialog-image');
const dialogCaption = dialog.querySelector('.dialog-caption');
let activePreview;

document.querySelectorAll('.screen-preview').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    if (typeof dialog.showModal !== 'function') {
      window.open(image.src, '_blank', 'noopener');
      return;
    }
    activePreview = button;
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = button.closest('figure').querySelector('h3').textContent;
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
  });
});

dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  activePreview?.focus({ preventScroll: true });
});
