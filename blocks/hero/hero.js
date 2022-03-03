export default async function decorate(block) {
  const lcpCandidate = block.querySelector('img');
  await new Promise((resolve) => {
    if (lcpCandidate && !lcpCandidate.complete) {
      lcpCandidate.setAttribute('loading', 'eager');
      lcpCandidate.addEventListener('load', () => resolve());
      lcpCandidate.addEventListener('error', () => resolve());
    } else {
      resolve();
    }
  });
  block.closest('.section').style.backgroundImage = `url(${lcpCandidate.currentSrc})`;
}