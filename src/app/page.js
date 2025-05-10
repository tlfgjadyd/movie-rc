"use client";

import { getPopularMovies } from "../lib/tmdb";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const popular = await getPopularMovies();
      setMovies(popular);
    }
    fetchMovies();
    //console.log(movies);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>인기 영화</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: "200px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
