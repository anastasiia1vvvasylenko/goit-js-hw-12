import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

const createGalleryCardTemplate = imgInfo => {
  return ` <li class="gallery-card">
      <a href="${imgInfo.largeImageURL}" class="gallery-item">
        <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${imgInfo.likes}</p>
          <p class="info-item"><b>Views:</b> ${imgInfo.views}</p>
          <p class="info-item"><b>Comments:</b> ${imgInfo.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${imgInfo.downloads}</p>
        </div>
      </a>
    </li>`;
};

export function addImagesToGallery(images) {
  const galleryEl = document.querySelector('.gallery');
  const markup = images
    .map(imgDetails => createGalleryCardTemplate(imgDetails))
    .join('');
  galleryEl.innerHTML = markup;

  lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.refresh();
}
