const header = document.querySelector('.header');
const movie = document.querySelector('.movie');
const movieDetail = document.querySelector('.movie__detail');
const movies = JSON.parse(localStorage.getItem('movies'));
const id = JSON.parse(localStorage.getItem('id'));

function getDetail() {

    let { title, poster_path, vote_average, overview } = movies.find(movie => movie.id == id);
    poster_path = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const movieTitle = document.createElement('h3');
    movieTitle.setAttribute('class', 'title');
    movieTitle.textContent = title;

    const img = document.createElement('img');
    img.setAttribute('src', poster_path);

    const content = document.createElement('p');
    content.setAttribute('class', 'content')
    content.textContent = overview;

    const score = document.createElement('p');
    score.setAttribute('class', 'score');
    score.innerHTML = `⭐평점 : ${vote_average}`;

    movieDetail.appendChild(movieTitle);
    movieDetail.appendChild(img);
    movieDetail.appendChild(content);
    movieDetail.appendChild(score);
}

header.addEventListener('click', () => window.location.replace('index.html'));
movie.addEventListener('click', () => alert(`영화 id: ${id}`));
window.addEventListener('load', getDetail);
