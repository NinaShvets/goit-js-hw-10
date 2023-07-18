import { fetchBreeds, fetchCatByBreeds } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const { breedSelect, loader, error } = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
const containerEl = document.querySelector('.cat-info');

function popBreadSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => {
      return `<option value = "${breed.id}">${breed.name}</option>`;
    })
    .join('');
}

function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}
function showError() {
  Notiflix.Notify.Failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
function hideError() {
  error.style.display = 'none';
}
function showCatInfo(cat) {
  containerEl.innerHTML = `
    <img src="${cat[0].url}" alt="Cat Image">
    <p><strong>Breed:</strong> ${cat[0].breeds[0].name}</p>
    <p><strong>Description:</strong> ${cat[0].breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${cat[0].breeds[0].temperament}</p>
  `;
  containerEl.style.display = 'block';
}

function hideCatInfo() {
  containerEl.innerHTML = '';
  containerEl.style.display = 'none';
}

function handleBreedChange() {
  const breedId = breedSelect.value;

  hideCatInfo();
  showLoader();

  fetchCatByBreeds(breedId)
    .then(cat => {
      hideLoader();
      showCatInfo(cat);
    })
    .catch(error => {
      hideLoader();
      showError();
    });
}

function hideError() {
  error.style.display = 'none';
}

window.addEventListener('load', () => {
  hideCatInfo();
  showLoader();

  fetchBreeds()
    .then(breeds => {
      hideLoader();
      popBreadSelect(breeds);
      new SlimSelect('.breed-select');
      breedSelect.addEventListener('change', handleBreedChange);
    })
    .catch(error => {
      hideLoader();
      showError();
    });
  hideError();
});
