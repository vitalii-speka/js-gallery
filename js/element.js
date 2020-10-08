import gallery from './gallery-items.js';

const galleryConteiner = document.querySelector('.js-gallery');
const gallerysMarkup = createGalleryCardsMark(gallery);
const btnModalClose = document.querySelector(`[data-action='close-lightbox']`);
const lightboxImagesRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');

btnModalClose.addEventListener('click', onCloseModal);

galleryConteiner.insertAdjacentHTML('beforeend', gallerysMarkup);

galleryConteiner.addEventListener('click', onGalleryOpenClick);

lightboxOverlayRef.addEventListener('click', onCloseModal);

function createGalleryCardsMark(gallery) {
  return gallery
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
    })
    .join('');
}

function onGalleryOpenClick(evt) {
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowRightKeyPress);
  window.addEventListener('keydown', onArrowLeftKeyPress);

  evt.preventDefault();

  const isGalleryImageEl = evt.target.classList.contains('gallery__image');
  if (!isGalleryImageEl) {
    return;
  }

  addClassList();

  lightboxImagesRef.src = evt.target.dataset.source;
  lightboxImagesRef.alt = evt.target.alt;
}

function addClassList() {
  document.querySelector('.lightbox').classList.add('is-open');
}

function onCloseModal() {
  removeClassList();
  lightboxImagesRef.src = ``;
  lightboxImagesRef.alt = ``;
}

function removeClassList() {
  document.querySelector('.lightbox').classList.remove('is-open');
}

function onEscKeyPress(evt) {
  if (evt.code === `Escape`) {
    onCloseModal();
  }
}

function onArrowRightKeyPress(evt) {
  if (evt.code === `ArrowRight`) {
    console.log(evt.previousElementSibling);
    console.dir(lightboxImagesRef);
    // console.log(gallery.scr);
    gallery.original = lightboxImagesRef.src;
    gallery.description = lightboxImagesRef.alt;
  }
}
// console.log(gallery[0]);

function onArrowLeftKeyPress(evt) {
  if (evt.code === `ArrowLeft`) {
    console.log(evt.code);
  }
}
