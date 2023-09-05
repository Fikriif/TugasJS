const hours = document.getElementById('jam');
const minutes = document.getElementById('menit');
const sec = document.getElementById('detik');

setInterval(() => {
    let currentTime = new Date;

    hours.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    minutes.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000)



const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
    } catch (error) {
        alert("Silahkan masukan judul film yang benar :)\n" + error);
    }

});

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=9f28bfd8&s=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if (response.Response === "False") {
                throw new Error(response.Error);
            }
            return response.Search;
        });
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(mList => cards += showCards(mList));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}

// event binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('modal-detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=9f28bfd8&i=' + imdbid)
        .then(response => response.json())
        .then(mList => mList);
}

function updateUIDetail(mList) {
    const movieDetail = showMovieDetail(mList);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}


function showCards(mList) {
    return `<div class="col-md-4 my-3">
    <div class="card">
      <img src="${mList.Poster}" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${mList.Title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${mList.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${mList.imdbID}">Show Details</a>
      </div>
    </div>
  </div>`;
}


function showMovieDetail(mList) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${mList.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${mList.Title} (${mList.Year})</h4></li>
                <li class="list-group-item"><strong>Director : </strong>${mList.Director}</li>
                <li class="list-group-item"><strong>Writer : </strong>${mList.Writer}</li>
                <li class="list-group-item"><strong>Actors : </strong>${mList.Actors}</li>
                <li class="list-group-item"><strong>Genre : </strong>${mList.Genre}</li>
              </ul>
        </div>
    </div>
  </div>`;
}


