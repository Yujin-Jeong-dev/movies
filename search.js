const form = document.querySelector('.search');
const movieLists = document.querySelector('.movie-lists')


function onSubmit(e) {
    e.preventDefault();
}

function addMovieCard(movie) {
    let { id, title, overview, poster_path, vote_average } = movie;
    poster_path = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const card = document.createElement('div');
    card.setAttribute('id', id);
    card.setAttribute('class', 'movie-card');

    const cardTitle = document.createElement('h3');
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.textContent = title;

    const poster = document.createElement('img');
    poster.setAttribute('src', poster_path);

    const content = document.createElement('p');
    content.textContent = overview;

    const score = document.createElement('p');
    score.textContent = `평점 : ${vote_average}`;

    card.appendChild(cardTitle);
    card.appendChild(poster);
    card.appendChild(content);
    card.appendChild(score);

    return card;
}

async function getMovieList() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODRhYTdhYzI0YzA4MDQ5NTliZTYwMWQ1NGNiNTVmNSIsInN1YiI6IjY1MzA3NDg4OWQ1OTJjMDBlY2NhNDIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pzeR-WgSZE9rH2RlMjPFsuTfxUsjdYUGJY41msWPjyE'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(res => { return res.json() })
        .then(data => {
            const movies = data.results;
            console.log(data);
            movies.map(movie => {
                const movieCard = addMovieCard(movie);
                movieLists.appendChild(movieCard);
            })
        })
        .catch(err => console.error(err));
}

getMovieList();


form.addEventListener('submit', onSubmit);