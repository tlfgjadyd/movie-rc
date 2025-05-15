"use client";
//메뉴 사이드바

import { useEffect, useState } from "react";
import { getGenres } from "@/lib/tmdb";

export default function GenreMenu({ isOpen, onClose, onSelectGenre }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenre();
  }, []);
  //console.log(genres); // 이제 됨
  async function fetchGenre() {
    const genre = await getGenres();
    setGenres(genre);
  }
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-250px", // 0아니면 -250전달해야되는데
        width: "250px",
        height: "100vh",
        backgroundColor: "#222",
        color: "white",
        transition: "right 0.3s ease",
        padding: "1rem",
        zIndex: 1000,
        overflowY: "auto", // 스크롤 추가
      }}
    >
      <button
        onClick={onClose}
        style={{
          float: "right",
          background: "none",
          color: "white",
          fontSize: "1.5rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        X
      </button>
      <h2 style={{ marginTop: "2rem" }}>장르 선택</h2>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {genres.map((genre) => (
          <li
            key={genre.id}
            onClick={() => {
              onSelectGenre(genre.id);
              onClose();
            }}
            style={{ fontSize: "1rem", margin: "1rem 0", cursor: "pointer" }}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
// 사이드바 스크롤 만들기
// 사이드바 누르면 메인 화면은 줄어들게 GPT 메인 화면처럼 이건 하지말자
