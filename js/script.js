// !!!!!!!!!!!!!!!!!!!  "Lightbox" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Projektbilder – jeweils 2–3 Bilder pro Projekt
const projects = [
  {
    images: ["img/projekt1/Webdesign1.webp", "img/projekt1/2.webp", "img/projekt1/3.webp"]
  },
  {
    images: ["img/projekt2/BFlyer1.webp", "img/projekt2/Broschüre1.webp"]
  },
  {
    images: ["img/projekt3/1.webp", "img/projekt3/2.webp", "img/projekt3/3.webp"]
  },
  {
    images: ["img/projekt4/1.webp", "img/projekt4/2.webp"]
  },
  {
    images: ["img/projekt5/1.webp", "img/projekt5/2.webp", "img/projekt5/3.webp"]
  }
];

// Flache Liste aller Bilder generieren
let allImages = [];
projects.forEach((project, projectIndex) => {
  project.images.forEach((src, imgIndex) => {
    allImages.push({ src, projectIndex, imgIndex });
  });
});

let currentIndex = 0;

function openProject(projectIndex) {
  // Finde globalen Index des ersten Bilds des Projekts
  currentIndex = allImages.findIndex(
    (img) => img.projectIndex === projectIndex && img.imgIndex === 0
  );
  openLightbox(currentIndex);
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "flex";
}

function updateLightbox() {
  const image = allImages[currentIndex];
  document.getElementById("lightboxImage").src = image.src;
}

window.closeLightbox = function() {
  document.getElementById("lightbox").style.display = "none";
};


function nextImage() {
  currentIndex = (currentIndex + 1) % allImages.length;
  updateLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  updateLightbox();
}


// svg als scroll-Link !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

document.getElementById("Ebene_1").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// data-scroll damit unter den header gescrollt wird !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function initSmoothScrollWithHeaderOffset(options = {}) {
  const headerSelector = options.headerSelector || '#site-header';
  const scrollSelector = options.scrollSelector || '[data-scroll]';

  const header = document.querySelector(headerSelector);
  const headerHeight = () => header ? header.offsetHeight : 0;

  document.querySelectorAll(scrollSelector).forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();

      // Ziel aus href oder data-scroll holen
      const targetSelector = this.getAttribute('href')?.startsWith('#')
        ? this.getAttribute('href')
        : this.getAttribute('data-scroll');

      if (!targetSelector) return;

      const target = document.querySelector(targetSelector);
      if (!target) return;

      const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
      const scrollToY = targetTop - headerHeight() + 2;

      window.scrollTo({
        top: scrollToY,
        behavior: 'smooth'
      });
    });
  });
}

// Aufruf – kann auch später oder nach DOM-Ready passieren
initSmoothScrollWithHeaderOffset();

////////////////////// Videobox //////////////////////////////////////////////////

  const trigger = document.getElementById("videoTrigger");
  const videobox = document.getElementById("videoBox");
  const videoWrapper = videobox.querySelector(".video-wrapper");
  const closeBtn = videobox.querySelector(".vclose-btn");

  const YT_SRC = "https://www.youtube.com/embed/mioN2zujT0U?si=FN5sDaDkAMmTx7-m";

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
  const iframe = document.createElement("iframe");
  iframe.src = YT_SRC;
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay; encrypted-media");
  videoWrapper.innerHTML = "";
  videoWrapper.appendChild(iframe);
  videobox.classList.add("show");
  });

  function closeLightbox() {
    videobox.classList.remove("show");
  videoWrapper.innerHTML = ""; // entfernt iframe = stoppt Video
  }

  closeBtn.addEventListener("click", closeLightbox);
  videobox.addEventListener("click", (e) => {
    if (e.target === videobox) closeLightbox(); // klick auf Hintergrund schließt auch
  });

  ///////////////////////////// Nach oben Button ///////////////////////////////////


  const scrollBtn = document.getElementById("scrollToTopBtn");

  // Zeigen/verstecken je nach Scroll-Position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  // Sanft nach oben scrollen
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });






