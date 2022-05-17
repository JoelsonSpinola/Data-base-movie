//Variaveis
const addModal = document.getElementById('add-modal');
const btnAddMovie = document.querySelector("header button");
const ModalDelete = document.getElementById('delete-modal');
const PassiveDel = document.querySelector('div#delete-modal div.modal__actions .btn--passive');
const DangerDel = document.querySelector('div#delete-modal div.modal__actions .btn--danger');
const tagMovieList = document.getElementById("movie-list");
const movieTitle = document.getElementById('title');
const movieImage = document.getElementById('image-url');
const movieRate = document.getElementById('rating');
const backdrop = document.getElementById('backdrop');
const addMovieBtn = document.getElementsByClassName("btn--success");
const cancelMovieBtn = document.getElementsByClassName("btn--passive");
const cardPersonalMovie = document.getElementById('entry-text');
const listMovies = []; // listas dos filmes
let movieItem = document.getElementById('movie-list');



//functions
backdropFunc = () => {
  backdrop.classList.toggle('visible');
  }

const cancelFunc = () => {
MovieModalFunc();
}

const MovieModalFunc = () => {
  handlerFunc(addModal);
}

const toggleDeleteModal = () => {
  handlerFunc(ModalDelete);
}

handlerFunc = (modal) => {
  modal.classList.toggle('visible') //adiciona class caso nao tenha
  backdropFunc();
  }
  
const cancelAndDelFunc = () => {
  toggleDeleteModal();
}
//Object Manegement

adicionarMoviesHandler = () => {
  const titleValue = movieTitle.value;
  const imageValue = movieImage.value;
  var rateValue = movieRate.value;

  if (titleValue.trim() === "" || 
  imageValue.trim() === "" ||
   rateValue.trim() === "" || 
   rateValue > 5 || 
   rateValue < 1) {
    alert("Imputs inaceitaveis!");
  }
  else {


    const movie = {
      iD: Math.random().toString(),//id adcionado,ficando assim mais facil localizar os filmes
      MovieName: titleValue,
      rating: rateValue,
      imagem: imageValue
    };
    listMovies.push(movie);
    MovieModalFunc();

    movieTitle.value = "";
    movieImage.value = "";
    movieRate.value = "";

    return movie;
  }
}

tagHandle = (tag, classValue, textTag) => {
  var tag = document.createElement(tag);
  if (textTag.trim() !== "") {
    const text = document.createTextNode(textTag);
    tag.appendChild(text);
  }
  if (classValue.trim() !== "") {
    tag.setAttribute("class", classValue);
  }
  return tag;
}
const addedMovie = () => {
  const movieElement = createMovie();
  tagMovieList.appendChild(movieElement);
  MovieModalFunc();
  cancelFunc();
  CardUpdate();
}

createMovie = () => {
const movie = adicionarMoviesHandler()
const movieElement = tagHandle("li", "movie-element", "");
movieElement.className = "movie-element";
movieElement.innerHTML = `
    <div class='movie-element__image'>
        <img src="${movie.imagem}" alt="${movie.MovieName}" />
    </div>
    <div class="movie-element__info">
        <h2>${movie.MovieName}</h2>
        <p>${movie.rating}/5</p>
    </div>
    `;
movieElement.addEventListener("click", delMovie.bind(null, movie.iD));
return movieElement;
}
CardUpdate = () => { //Determona se card com o id present deve ou nao ser mostrado
  if (listMovies.length !== 0) {
    cardPersonalMovie.style.display = "none"
  }
}
const delMovieHandle = (movieId) => {

  let index = 0;
  for (let movie of listMovies) {
    if (movieId === movie.iD) {
      break;
    }
    index++;
  }
  listMovies.splice(index, 1);
  tagMovieList.children[index].remove();
  toggleDeleteModal()
}
const delMovie = (movieId) => {
  toggleDeleteModal();
  DangerDel.addEventListener('click', ()=>{
    delMovieHandle(movieId)
  })
}
//Event listener
btnAddMovie.addEventListener('click', MovieModalFunc);
addMovieBtn[0].addEventListener('click', addedMovie);
cancelMovieBtn[0].addEventListener('click', cancelFunc);
PassiveDel.addEventListener('click', cancelAndDelFunc);


//JSPINOLA
//CODE:120032
//LEIT3