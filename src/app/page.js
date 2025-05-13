"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
  getGenres,
} from "../lib/tmdb";
import GenreMenu from "@/components/GenreMenu";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreName, setGenreName] = useState("");
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    fetchGenres();
    fetchPopular();
    fetchSearch();
  }, []);

  useEffect(() => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      if (query.trim()) {
        fetchSearch(query);
      } else if (selectedGenre) {
        fetchByGenre(selectedGenre);
      } else {
        fetchPopular();
      }
    }, 400);
    setTimer(newTimer);
  }, [query]);

  async function fetchGenres() {
    const genreList = await getGenres();
    setGenres(genreList);
  }

  function updatePageData(page) {
    setCurrentPage(page);
    setStartPage(Math.floor((page - 1) / 10) * 10 + 1);
  }

  async function fetchPopular(page = 1) {
    const data = await getPopularMovies(page);
    setMovies(data.results);
    updatePageData(page);
    setTotalPages(data.total_pages);
    setSelectedGenre(null);
    setGenreName("");
  }

  async function fetchSearch(q, page = 1) {
    const data = await searchMovies(q, page);
    setMovies(data.results);
    setTotalPages(data.total_pages);
    updatePageData(page);
  }

  async function fetchByGenre(genreId, page = 1) {
    const data = await getMoviesByGenre(genreId, page);
    setMovies(data.results);
    updatePageData(page);
    setTotalPages(data.total_pages);
    setSelectedGenre(genreId);
    const genre = genres.find((g) => g.id === genreId);
    if (genre) setGenreName(genre.name);
  }

  const handlePageClick = (page) => {
    if (query.trim()) {
      fetchSearch(query, page);
      // console.log("됨");
      // console.log(page);
    } else if (selectedGenre) {
      fetchByGenre(selectedGenre, page);
    } else {
      fetchPopular(page);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* Header */}
      <button
        onClick={() => setIsMenuOpen(true)}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          fontSize: "1.5rem",
        }}
      >
        ☰
      </button>
      <h1
        onClick={() => {
          fetchPopular();
          setQuery("");
        }}
        style={{ cursor: "pointer" }}
      >
        Title
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="영화 제목 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", marginBottom: "1rem" }}
      />

      {/* Title */}
      <h2 style={{ display: query ? "none" : "block" }}>
        인기 영화 {genreName && `: ${genreName}`}
      </h2>

      {/* Movies */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {movies.map((movie) => (
          <Link key={movie.id} href={`/detail/${movie.id}`}>
            <div style={{ width: "200px", cursor: "pointer" }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", padding: "10px" }}
              />
              <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Genre Menu */}
      <GenreMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectGenre={(genreId) => {
          fetchByGenre(genreId, 1);
          setQuery("");
          setIsMenuOpen(false);
        }}
      />

      {/* Pagination */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {Array.from(
          { length: Math.min(10, totalPages - startPage + 1) },
          (_, i) => {
            const pageNum = startPage + i;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                style={{
                  backgroundColor: currentPage === pageNum ? "#0070f3" : "#eee",
                  color: currentPage === pageNum ? "#fff" : "#000",
                  margin: "0 5px",
                }}
              >
                {pageNum}
              </button>
            );
          }
        )}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
