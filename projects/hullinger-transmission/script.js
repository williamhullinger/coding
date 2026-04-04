const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', function () {
    nav.classList.toggle('is-open');

    const isOpen = nav.classList.contains('is-open');

    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation' : 'Open navigation'
    );
  });
}
