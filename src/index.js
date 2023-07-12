import { fetchImages } from './fetchImages';
import { makeMarkup } from './makeMarkup';
import toastr from 'toastr';
import SimpleLightbox from 'simplelightbox';
import { debounce } from 'lodash';

import './toastr.config';
import 'toastr/build/toastr.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './common.css';

let PER_PAGE = 40;

let page = 1;
let inputValue = '';
let maxPagesAmount = 0;

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.gallery a', { scrollZoom: false });

const clearGallery = () => {
  refs.gallery.innerHTML = '';
};

const render = resultArray => {
  refs.gallery.insertAdjacentHTML('beforeend', makeMarkup(resultArray));
};

const addSmoothScroll = () => {
  if (page !== 1) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
};

const showLoadMoreBtn = () => {
  refs.loadMoreBtn.classList.remove('hidden');
};

const showImages = async () => {
  try {
    const { hits, totalHits } = await fetchImages(inputValue, page);
    maxPagesAmount = totalHits;

    if (hits.length === 0)
      return toastr.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );

    render(hits);

    addSmoothScroll();

    showLoadMoreBtn();

    lightbox.refresh();

    if (page === 1) {
      toastr.success(`Hooray! We found ${maxPagesAmount} images.`);
    }
  } catch (error) {
    toastr.error(error.message);
  }
};

const hideLoadMoreBtn = () => {
  refs.loadMoreBtn.classList.add('hidden');
};

const onFormSubmit = e => {
  e.preventDefault();
  page = 1;
  inputValue = e.target.elements.searchQuery.value;

  hideLoadMoreBtn();

  clearGallery();

  showImages();

  e.target.reset();
};

const loadNextPage = () => {
  page += 1;

  if (page > Math.ceil(maxPagesAmount / PER_PAGE))
    return toastr.error(
      "We're sorry, but you've reached the end of search results."
    );

  showImages();
};

const onClickLoadMoreBtn = () => {
  loadNextPage();
};

const onScroll = e => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadNextPage();
  }
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);
window.addEventListener('scroll', debounce(onScroll, 300));
