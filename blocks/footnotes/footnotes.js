export default async function decorate($block) {
  // enumerate all footnote references
  [...document.querySelectorAll('main sup')]
    .forEach((sup, i) => {
      let num = i + 1;
      const text = sup.textContent.trim();
      if (/\d+/.test(text) || text === '#') {
        if (/\d+/.test(text)) {
          // number, assume fixed reference
          num = text;
        } else if (text === '#') {
          // placeholder, assign a new number
          sup.textContent = num;
        }
        sup.classList.add('footnote-ref');
        sup.addEventListener('click', () => {
          const footnote = document.getElementById(`footnote-${num}`);
          if (footnote) {
            footnote.scrollIntoView({ behavior: 'smooth', block: 'center' });
            footnote.classList.add('footnote-highlight');
            setTimeout(() => {
              footnote.classList.remove('footnote-highlight');
            }, 5000);
          }
        });
      }
    });

  // enumerate footnotes
  document.querySelector('footer').append($block);
  [...$block.children].forEach(($footnote, i) => {
    $footnote.firstElementChild.classList.add('footnote-text');
    const $num = document.createElement('div');
    $num.classList.add('footnote-num');
    $num.innerHTML = `<sup>${i + 1}</sup>`;
    $footnote.prepend($num);
    $footnote.id = `footnote-${i + 1}`;
  });
}
