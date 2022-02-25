export default function decorate(block) {
  block.classList.add('loading');
  const link = block.querySelector('a');
  if (!link) return;
  const url = link.href;
  if (!url || !url.startsWith('https://cdnapisec.kaltura.com/')) return;
  link.remove();
  setTimeout(() => {
    block.innerHTML = `<iframe width="720" height="405" src="${url}" frameborder="0" border="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
    block.querySelector(':scope iframe').addEventListener('load', () => {
      block.classList.remove('loading');
    });
  }, 2000);
}
