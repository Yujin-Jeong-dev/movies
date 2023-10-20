const form = document.querySelector('.search');
const searchInput = document.querySelector('#search__input');
const searchBtn = document.querySelector('.search__btn');
const movieLists = document.querySelector('.movie-lists')
let movies;

function onSubmit(e) {
    e.preventDefault();
    if (searchInput.value.trim() !== '') filterMovieCard();
}



function showMovieCard(movies) {
    movies.map(movie => {
        const movieCard = addMovieCard(movie);
        movieLists.appendChild(movieCard);
        movieCard.addEventListener('click', () => {
            alert(`영화 id : ${movie.id}`);
        })
    });

}

function filterMovieCard() {
    //input에서 입력한 값을 가져오고 소문자로 모두 변환함. 
    const keyword = searchInput.value.toLowerCase();
    //영화 데이터들 중에서 제목이 해당 키워드를 포함한 영화만 보여주고 그렇지 않으면 숨기기
    movies.map((movie) => {
        if (!movie.title.toLowerCase().includes(keyword)) document.getElementById(`${movie.id}`).style.display = 'none';
        else document.getElementById(`${movie.id}`).style.display = 'block';
    })
}

//해당 영역에만 무비 카드를 만듬. 전체면 전체고, 필터링이면 필터링만 만들기 
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
    content.setAttribute('class', 'content')
    content.textContent = overview;

    const score = document.createElement('p');
    score.textContent = `평점 : ${vote_average}`;

    card.appendChild(cardTitle);
    card.appendChild(poster);
    card.appendChild(content);
    card.appendChild(score);

    return card;
}



async function getMovies() {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${config.key}`
        }
    };
    const url = config.url;

    await axios.get(url, options)
        .then(res => {
            movies = res.data.results;
            showMovieCard(movies);
        })
        .catch(console.err);



    // fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    //     .then(res => { return res.json() })
    //     .then(data => {
    //         const movies = data.results;
    //         //영화들 데이터를 가져와 영화 카드를 보여줌. 
    //         showMovieCard(movies);
    //     })
    //     .catch(err => console.error(err));

}



form.addEventListener('submit', onSubmit);
window.addEventListener('load', getMovies)