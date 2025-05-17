import Link from "next/link";

export default async function DetailPage({ params }) {
  // 현재 영화 정보 가져오기
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`
  );
  const movie = await res.json();

  // 추천 영화 가져오기
  const recommendRes = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR&page=1`
  );
  const recommendData = await recommendRes.json();
  const recommendMovies = recommendData.results?.slice(0, 5) || [];

  // 비슷한 영화 가져오기
  const similarRes = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR&page=1`
  );
  const similarData = await similarRes.json();
  const similarMovies = similarData.results?.slice(0, 5) || [];

  return (
    <div style={{ padding: "2rem" }}>
      <Link href={"/"}>
        <button
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
      </Link>

      {/* 현재 영화 정보 */}
      <div className="current-movie">
        <h1>{movie.title}</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "300px", height: "auto" }}
          />
          <div>
            <p>{movie.overview}</p>
            <p>
              <strong>평점:</strong> {movie.vote_average}
            </p>
          </div>
        </div>
      </div>

      {/* 추천 영화 섹션 */}
      <div className="recommended-movies" style={{ marginTop: "40px" }}>
        <h2>추천 영화</h2>
        <div
          style={{
            display: "flex",
            gap: "15px",
            overflowX: "auto",
            padding: "10px 0",
          }}
        >
          {recommendMovies.map((movie) => (
            <Link href={`/detail/${movie.id}`} key={movie.id}>
              <div
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  width: "180px",
                }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "/placeholder-poster.png"
                  }
                  alt={movie.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "270px",
                    objectFit: "cover",
                  }}
                />
                <p style={{ fontSize: "14px", marginTop: "8px" }}>
                  {movie.title}
                </p>
              </div>
            </Link>
          ))}
          {recommendMovies.length === 0 && <p>추천 영화가 없습니다.</p>}
        </div>
      </div>

      {/* 비슷한 영화 섹션 */}
      <div className="similar-movies" style={{ marginTop: "40px" }}>
        <h2>비슷한 영화</h2>
        <div
          style={{
            display: "flex",
            gap: "15px",
            overflowX: "auto",
            padding: "10px 0",
          }}
        >
          {similarMovies.map((movie) => (
            <Link href={`/detail/${movie.id}`} key={movie.id}>
              <div
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  width: "180px",
                }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "/placeholder-poster.png"
                  }
                  alt={movie.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "270px",
                    objectFit: "cover",
                  }}
                />
                <p style={{ fontSize: "14px", marginTop: "8px" }}>
                  {movie.title}
                </p>
              </div>
            </Link>
          ))}
          {similarMovies.length === 0 && <p>비슷한 영화가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
}
