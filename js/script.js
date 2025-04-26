// !!!!!!!!!!!!!!!!!!!  "Lightbox" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Projektbilder – jeweils 2–3 Bilder pro Projekt
const projects = [
  {
    images: ["img/projekt1/1.jpg", "img/projekt1/2.jpg", "img/projekt1/3.jpg"]
  },
  {
    images: ["img/projekt2/1.jpg", "img/projekt2/2.jpg"]
  },
  {
    images: ["img/projekt3/1.jpg", "img/projekt3/2.jpg", "img/projekt3/3.jpg"]
  },
  {
    images: ["img/projekt4/1.jpg", "img/projekt4/2.jpg"]
  },
  {
    images: ["img/projekt5/1.jpg", "img/projekt5/2.jpg", "img/projekt5/3.jpg"]
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


  // const projects = [
  //   {
  //     images: ["projektA1.jpg", "projektA2.jpg", "projektA3.jpg"],
  //   },
  //   {
  //     images: ["projektB1.jpg", "projektB2.jpg"],
  //   },
  //   {
  //     images: ["projektC1.jpg", "projektC2.jpg", "projektC3.jpg"],
  //   },
  //   {
  //     images: ["projektD1.jpg", "projektD2.jpg"],
  //   },
  //   {
  //     images: ["projektE1.jpg", "projektE2.jpg", "projektE3.jpg"],
  //   },
  // ];

  // const gallery = document.getElementById("gallery");
  // const lightbox = document.getElementById("lightbox");
  // const lightboxImage = document.getElementById("lightboxImage");

  // let allImages = [];
  // let currentIndex = 0;

  // // Alle Bilder in eine flache Liste umwandeln
  // projects.forEach((project, projectIndex) => {
  //   project.images.forEach((img, imgIndex) => {
  //     allImages.push({
  //       src: img,
  //       projectIndex,
  //       imgIndex,
  //     });
  //   });
  // });

  // // Galerie: Nur erstes Bild jedes Projekts anzeigen
  // projects.forEach((project, index) => {
  //   const div = document.createElement("div");
  //   div.className = "project";
  //   div.innerHTML = `
  //     <img src="${project.images[0]}" alt="Projektbild" />
  //   `;
  //   // Beim Klick: Startindex des ersten Bilds finden
  //   const startIndex = allImages.findIndex(
  //     (img) => img.projectIndex === index && img.imgIndex === 0
  //   );
  //   div.addEventListener("click", () => openLightbox(startIndex));
  //   gallery.appendChild(div);
  // });

  // function openLightbox(index) {
  //   currentIndex = index;
  //   updateLightbox();
  //   lightbox.style.display = "flex";
  // }

  // function updateLightbox() {
  //   const img = allImages[currentIndex];
  //   lightboxImage.src = img.src;
  // }

  // function closeLightbox() {
  //   lightbox.style.display = "none";
  // }

  // function nextImage() {
  //   currentIndex = (currentIndex + 1) % allImages.length;
  //   updateLightbox();
  // }

  // function prevImage() {
  //   currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  //   updateLightbox();
  // }



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

  // Nach oben Button ****************************************************


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






