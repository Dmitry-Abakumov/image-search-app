export const makeMarkup = queryResult => {
  return queryResult
    .map(({ largeImageURL, previewURL, views, likes, comments, downloads }) => {
      return ` 
      <a href=${largeImageURL}>
    <div class="photo-card">
      <div class="img-wrapper">
        <img class="img" src=${previewURL} alt="" loading="lazy" />
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${downloads}
        </p>
      </div>
    </div>
  </a>`;
    })
    .join('');
};
