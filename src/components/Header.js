"use client";

export default function Header({
  isMenuOpen,
  onOpenMenu,
  onTitleClick,
  query,
  setQuery,
  genreName,
}) {
  return (
    <div style={{ padding: "2rem" }}>
      {/* Header */}
      <button
        onClick={onOpenMenu}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          fontSize: "1.5rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
      >
        ☰
      </button>
      <h1
        onClick={onTitleClick}
        style={{
          cursor: "pointer",
          display: "inline-block",
          cursor: "pointer",
        }}
      >
        Title
      </h1>
      <hr />
      {/* Search */}
      <input
        type="text"
        placeholder="영화 제목 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "300px",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      />
      {/* Title */}
      <h2 style={{ display: query ? "none" : "block" }}>
        인기 영화 {genreName && `: ${genreName}`}
      </h2>
    </div>
  );
}
