(() => {
  const root = document.documentElement;
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTop = document.getElementById('scrollTop');
  const typedText = document.getElementById('typedText');

  // Mobile navigation
  menuToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  navMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  // Theme preference
  const savedTheme = localStorage.getItem('nabil-theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('nabil-theme', next);
  });

  // Accent color picker
  const savedColor = localStorage.getItem('nabil-accent');
  if (savedColor) root.style.setProperty('--accent', savedColor);
  document.querySelectorAll('.swatch').forEach(swatch => {
    if (swatch.dataset.color === savedColor) swatch.classList.add('active');
    swatch.addEventListener('click', () => {
      const color = swatch.dataset.color;
      root.style.setProperty('--accent', color);
      localStorage.setItem('nabil-accent', color);
      document.querySelectorAll('.swatch').forEach(item => item.classList.toggle('active', item === swatch));
    });
  });

  // Dynamic typing animation (home page only)
  if (typedText) {
    const words = ['Web Developer', 'Frontend Developer', 'Creative Builder'];
    let wordIndex = 0, charIndex = words[0].length, deleting = true;
    const type = () => {
      const word = words[wordIndex];
      typedText.textContent = word.slice(0, charIndex);
      if (deleting) {
        charIndex--;
        if (charIndex < 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; }
      } else {
        charIndex++;
        if (charIndex > words[wordIndex].length) { deleting = true; setTimeout(type, 1100); return; }
      }
      setTimeout(type, deleting ? 55 : 95);
    };
    setTimeout(type, 1400);
  }

  // Scroll-to-top visibility and sticky header shadow
  const onScroll = () => {
    scrollTop?.classList.toggle('visible', window.scrollY > 450);
    document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Current year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();


// Floating Contact Toggle

const contactToggle = document.getElementById("contactToggle");
const contactButtons = document.querySelectorAll(".contact-btn");

if (contactToggle) {

    let contactOpen = true;

    contactToggle.addEventListener("click", function () {

        contactOpen = !contactOpen;

        contactButtons.forEach(button => {
            button.style.display = contactOpen ? "flex" : "none";
        });

        contactToggle.innerHTML = contactOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-comment-dots"></i>';

    });

}


// Custom Mouse Cursor Follower

document.addEventListener("DOMContentLoaded", function () {

    const cursor = document.getElementById("customCursor");

    if (!cursor) return;

    // Enable cursor on desktop
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        cursor.classList.add("active");
    }

    // Follow mouse movement
    document.addEventListener("mousemove", function (event) {

        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";

    });

    // Hover animation
    document.querySelectorAll("a, button, input, textarea, select")
        .forEach(function (element) {

            element.addEventListener("mouseenter", function () {
                cursor.classList.add("hover");
            });

            element.addEventListener("mouseleave", function () {
                cursor.classList.remove("hover");
            });

        });

});