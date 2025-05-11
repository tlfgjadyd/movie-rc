const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies(page) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
  );
  const data = await res.json();
  //console.log("test" + API_KEY);
  return data.results;
}

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await res.json();
  return data.results;
}

export async function getGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
  );
  const data = await res.json();
  return data.genres; // 형태 : { id: 28, name: "액션" }, {id:...} 장르의 모음
}

export async function getMoviesByGenre(genreId) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&with_genres=${genreId}`
  );
  const data = await res.json();
  return data.results;
}
