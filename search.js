const header = document.querySelector('.header');
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
            //alert(`영화 id : ${movie.id}`);
            const id = movie.id;
            //id가 있으면 값을 찾아서 해당 id를 저장
            console.log(id);
            id && localStorage.setItem('id', JSON.stringify(id));
            window.location.href = 'movieDetail.html';
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
    let { id, title, poster_path } = movie;
    poster_path = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const card = document.createElement('div');
    card.setAttribute('id', id);
    card.setAttribute('class', 'movie-card');

    const cardTitle = document.createElement('h3');
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.textContent = title;

    const poster = document.createElement('img');
    poster.setAttribute('src', poster_path);

    card.appendChild(cardTitle);
    card.appendChild(poster);

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
            if (movies.length > 0) saveMovies();
            showMovieCard(movies);
        })
        .catch(console.err);

}

function saveMovies() {
    localStorage.setItem('movies', JSON.stringify(movies));
}



//header.addEventListener('click', () => window.location.reload())
form.addEventListener('submit', onSubmit);
window.addEventListener('load', getMovies);


