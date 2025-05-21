"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DetailContent({
  movie,
  recommendMovies,
  similarMovies,
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  if (loading || !user) {
    return <p>접근 중... 로그인 상태 확인 중입니다.</p>;
  }

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
          <div style={{ width: 90, height: "auto" }}>
            <CircularProgressbar
              value={movie.vote_average * 10}
              text={`${movie.vote_average * 10}%`}
              styles={buildStyles({
                textSize: "24px",
                pathColor: movie.vote_average >= 7 ? "#21d07a" : "#d2d531", // 높은 평점은 초록, 낮은 평점은 노랑
                textColor: "#fff",
                trailColor: "#204529",
                backgroundColor: "#081c22",
              })}
            />
          </div>

          <div>
            <p>{movie.overview}</p>
            <p>{/* <strong>평점:</strong> {movie.vote_average} */}</p>
          </div>
        </div>
      </div>

      {/* 추천 영화 */}
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
          {recommendMovies.length > 0 ? (
            recommendMovies.map((movie) => (
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
            ))
          ) : (
            <p>추천 영화가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 비슷한 영화 */}
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
          {similarMovies.length > 0 ? (
            similarMovies.map((movie) => (
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
            ))
          ) : (
            <p>비슷한 영화가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
