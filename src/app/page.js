"use client";

import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
  getGenres,
} from "../lib/tmdb";
import { useEffect, useState } from "react";
import Link from "next/link";
import GenreMenu from "@/components/GenreMenu";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(""); //검색
  // const [disp, setDisplay] = useState("block"); // 검색하면 인기 영화 없앨 예정
  const [isMenuOpen, setIsMenuOpen] = useState(false); //menu사이드 바 처음엔 닫힘
  const [genreName, setGenreName] = useState("");
  const [genres, setGenres] = useState([]);

  // 디바운스를 위한 타이머 ID 저장
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    fetchPopular();
    fetchGenre();
  }, []);

  useEffect(() => {
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (!query.trim()) {
        fetchPopular();
      } else {
        fetchsearch(query);
      }
    }, 400); //입력후 400ms지나면 API요청
    setTimer(newTimer);
  }, [query]); //qurey바뀔때만
  async function fetchPopular() {
    const data = await getPopularMovies();
    setMovies(data);
  }
  async function fetchsearch(q) {
    const data = await searchMovies(q); //검색어 관련 영화를 movies에
    setMovies(data);
  }
  async function fetchByGenre(genreId) {
    const data = await getMoviesByGenre(genreId);
    setMovies(data);

    const genre = genres.find((g) => g.id === genreId);
    if (genre) setGenreName(genre.name);
  }

  async function fetchGenre() {
    const genre = await getGenres();
    setGenres(genre);
  }

  // async function handleSearch(e) {
  //   e.preventDefault(); //폼 제출시 새로고침X
  //   if (!query.trim()) {
  //     //검색어 없으면 인기여화
  //     fetchPopular();
  //     return;
  //   }
  //   const data = await searchMovies(query); //검색어 관련 영화를 movies에
  //   setMovies(data);
  // }

  return (
    <div style={{ padding: "2rem" }}>
      {/* 메뉴 버튼 */}
      <div>
        <button
          onClick={() => setIsMenuOpen(true)}
          style={{
            position: "fixed",
            // position: "absolute",
            top: "1rem",
            right: "1rem",
            fontSize: "1.5rem",
            padding: "0.5rem",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
        {/* 링크로 리다이렉트 필요없 이미 "/" 경로에서 상태가 바뀐거라 ..스읍*/}
        {/* <Link href="/"> */}
        <h1
          onClick={() => {
            fetchPopular();
            setQuery("");
            setGenreName("");
          }}
          style={{
            display: "inline-block",
            paddingBottom: "10px",
            float: "top",
            cursor: "pointer",
          }}
        >
          Title
        </h1>
        {/* </Link> */}
        {/* <form onSubmit={handleSearch} style={{ marginBottom: "2rem" }}> */}
      </div>

      {/* <button
          type="submit"
          style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
        >
          검색
        </button> */}
      {/* </form> */}

      <h2
        style={{
          paddingBottom: "2rem",
          display: query !== "" ? "none" : "inline-block",
        }}
      >
        인기 영화
        {/*
        : {장르} 이런식으로 배치 만약 안고른 상태 즉 인기영화 그대로면 X
        */}
        {genreName && `:${genreName}`}
      </h2>
      <input
        type="text"
        placeholder="영화 제목 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // 검색할 때 실시간으로 영화 이미지 바꾸는건 안되나?
        style={{
          marginRight: "30px",
          padding: "0.5rem",
          width: "300px",
          // float: "right",
          display: "flex",
          justifyContent: "space-between",
        }}
      />
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

      <GenreMenu
        isOpen={isMenuOpen} //right
        onClose={() => setIsMenuOpen(false)}
        onSelectGenre={(genreId) => {
          fetchByGenre(genreId);
          setQuery(""); //검색초기화
          setIsMenuOpen(false);
        }}
      />
    </div>
  );
}
