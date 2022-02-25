import { toClassName, readBlockConfig, makeRelativeLinks } from '../../scripts/scripts.js';

/**
 * collapses all open nav sections
 * @param {Element} sections The container element
 */

function collapseAllNavSections(sections) {
  sections.querySelectorAll('.nav-section').forEach((section) => {
    section.setAttribute('aria-expanded', 'false');
  });
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch nav content
  const navPath = cfg.nav || '/nav';
  const resp = await fetch(`${navPath}.plain.html`);
  const html = await resp.text();

  // decorate nav DOM
  const nav = document.createElement('div');
  nav.classList.add('nav');
  nav.setAttribute('aria-role', 'navigation');
  const navSections = document.createElement('div');
  navSections.classList.add('nav-sections');
  nav.innerHTML = html;

  nav.querySelector(':scope > div').classList.add('nav-brand');
  
  document.querySelectorAll('main h2').forEach((heading, i) => {
    const navSection = document.createElement('div');
    const h2 = navSection.appendChild(document.createElement('h2'));
    h2.textContent = heading.textContent;
    h2.addEventListener('click', () => {
      heading.scrollIntoView({ behavior: 'smooth', block: 'center'});
    });
    navSections.append(navSection);
    navSection.classList.add('nav-section');
  });
  const orgLogo = navSections.appendChild(document.createElement('div'));
  orgLogo.classList.add('nav-section', 'nav-alt-brand');
  navSections.append(orgLogo);

  nav.append(navSections);
  block.append(nav);

  makeRelativeLinks(nav);
}
