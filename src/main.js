import iziToast from 'izitoast';
import { fetchPhotos } from './js/pixabay-api';
import { addImagesToGallery } from './js/render-functions';

const searchForm = document.querySelector('.submit-form');
const searchInput = document.querySelector('.search-input');
const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');

let page = 1;
const perPage = 15;
let query = '';
let totalPages = 0;

function clearGallery() {
  galleryEl.innerHTML = '';
}

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  page = 1;
  loadBtn.classList.add('hidden-btn');

  try {
    const { hits, totalHits } = await fetchPhotos(query, page, perPage);
    if (hits.length > 0) {
      addImagesToGallery(hits);
      totalPages = Math.ceil(totalHits / perPage);

      if (page < totalPages) {
        loadBtn.classList.remove('hidden-btn');
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } else {
      loadBtn.classList.add('hidden-btn');
    }
  } catch (error) {
    iziToast.error({
      message: 'An error occurred. Please try again later.',
      position: 'topRight',
    });
  }
});

loadBtn.addEventListener('click', async () => {
  page += 1;
  try {
    const { hits } = await fetchPhotos(query, page, perPage);
    if (hits.length > 0) {
      addImagesToGallery(hits);
      const { height } = document
        .querySelector('.gallery-card')
        .getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });

      if (page >= totalPages) {
        loadBtn.classList.add('hidden-btn');
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } else {
      iziToast.info({
        message: 'No more images to load',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message:
        'An error occurred while loading more images. Please try again later.',
      position: 'topRight',
    });
  }
});

// import iziToast from 'izitoast';
// import { fetchPhotos } from './js/pixabay-api';
// import { addImagesToGallery } from './js/render-functions';

// const searchForm = document.querySelector('.submit-form');
// const searchInput = document.querySelector('.search-input');
// const galleryEl = document.querySelector('.gallery');
// const loadBtn = document.querySelector('.load-btn');

// let page = 1;
// const perPage = 15;
// let query = '';
// let totalPages = 0;

// function clearGallery() {
//   galleryEl.innerHTML = '';
// }

// searchForm.addEventListener('submit', async event => {
//   event.preventDefault();
//   query = searchInput.value.trim();

//   if (!query) {
//     iziToast.error({
//       message: 'Please enter a search query!',
//       position: 'topRight',
//     });
//     return;
//   }

//   clearGallery();
//   page = 1;

//   try {
//     const { hits, totalHits } = await fetchPhotos(query, page, perPage);
//     if (hits.length > 0) {
//       addImagesToGallery(hits);
//       totalPages = Math.ceil(totalHits / perPage);

//       if (page < totalPages) {
//         loadBtn.classList.remove('hidden-btn');
//       } else {
//         loadBtn.classList.add('hidden-btn');
//         iziToast.info({
//           message: "We're sorry, but you've reached the end of search results.",
//           position: 'topRight',
//         });
//       }
//     } else {
//       loadBtn.classList.add('hidden-btn');
//     }
//   } catch (error) {
//     iziToast.error({
//       message: 'An error occurred. Please try again later.',
//       position: 'topRight',
//     });
//   }
// });

// loadBtn.addEventListener('click', async () => {
//   page += 1;
//   try {
//     const { hits } = await fetchPhotos(query, page, perPage);
//     if (hits.length > 0) {
//       addImagesToGallery(hits);
//       const { height } = document
//         .querySelector('.gallery-card')
//         .getBoundingClientRect();
//       window.scrollBy({
//         top: height * 2,
//         behavior: 'smooth',
//       });
//       if (page >= totalPages) {
//         loadBtn.classList.add('hidden-btn');
//         iziToast.info({
//           message: "We're sorry, but you've reached the end of search results.",
//           position: 'topRight',
//         });
//       }
//     } else {
//       iziToast.info({
//         message: 'No more images to load',
//         position: 'topRight',
//       });
//     }
//     loadBtn.classList.add('hidden-btn');
//   } catch (error) {
//     iziToast.error({
//       message:
//         'An error occurred while loading more images. Please try again later.',
//       position: 'topRight',
//     });
//   }
// });
