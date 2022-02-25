export default function decorate(block) {
  [...block.children].forEach((item) => {
    item.classList.add('image-list-item');
    const text = item.querySelector(':scope > div:last-child');
    text.classList.add('image-list-item-text');
    text.innerHTML = `<span>${text.textContent}</span>`;
  });
}
