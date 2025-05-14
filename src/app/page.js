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
import MovieList from "@/components/MovieList";
import Pagination from "@/components/Pagination";
import Header from "@/components/Header";

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
    //리펙토링 하는중
    //리펙토링 완
    <div style={{ padding: "2rem" }}>
      <Header
        isMenuOpen={isMenuOpen}
        onOpenMenu={() => setIsMenuOpen(true)}
        onTitleClick={() => {
          fetchPopular();
          setQuery("");
          setGenreName("");
          setSelectedGenre(null);
        }}
        query={query}
        setQuery={setQuery}
        genreName={genreName}
      />
      {/* Movies */}
      <MovieList movies={movies} />
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        onPageClick={handlePageClick}
      />
    </div>
  );
}
