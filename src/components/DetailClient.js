"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./DetailClient.module.css";

export default function DetailContent({
  movie,
  recommendMovies,
  similarMovies,
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showFullOverview, setShowFullOverview] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  if (loading || !user) {
    return (
      <div className={styles.loadingContainer}>
        <p>접근 중... 로그인 상태 확인 중입니다.</p>
      </div>
    );
  }

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const shouldTruncate = movie.overview && movie.overview.length > 200;

  return (
    <div className={styles.detailContainer}>
      <Link href={"/"} className={styles.closeButton}>
        ✕
      </Link>

      {/* 현재 영화 정보 */}
      <div className={styles.currentMovie}>
        <h1 className={styles.movieTitle}>{movie.title}</h1>

        <div className={styles.movieInfo}>
          <div className={styles.posterContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
          </div>

          <div className={styles.ratingContainer}>
            <CircularProgressbar
              value={movie.vote_average * 10}
              text={`${Math.round(movie.vote_average * 10)}%`}
              styles={buildStyles({
                textSize: "18px",
                pathColor: movie.vote_average >= 7 ? "#21d07a" : "#d2d531",
                textColor: "#fff",
                trailColor: "#204529",
                backgroundColor: "#081c22",
              })}
            />
            <p className={styles.ratingLabel}>사용자 평점</p>
          </div>

          <div className={styles.overviewContainer}>
            <h3>줄거리</h3>
            <p className={styles.overviewText}>
              {shouldTruncate && !showFullOverview
                ? truncateText(movie.overview)
                : movie.overview}
            </p>
            {shouldTruncate && (
              <button
                className={styles.moreButton}
                onClick={() => setShowFullOverview(!showFullOverview)}
              >
                {showFullOverview ? "접기" : "더보기"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 추천 영화 */}
      <section className={styles.movieSection}>
        <h2 className={styles.sectionTitle}>추천 영화</h2>
        <div className={styles.movieGrid}>
          {recommendMovies.length > 0 ? (
            recommendMovies.map((movie) => (
              <Link
                href={`/detail/${movie.id}`}
                key={movie.id}
                className={styles.movieCard}
              >
                <div className={styles.movieItem}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : "/placeholder-poster.png"
                    }
                    alt={movie.title}
                    className={styles.movieThumbnail}
                  />
                  <p className={styles.movieCardTitle}>{movie.title}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className={styles.noMovies}>추천 영화가 없습니다.</p>
          )}
        </div>
      </section>

      {/* 비슷한 영화 */}
      <section className={styles.movieSection}>
        <h2 className={styles.sectionTitle}>비슷한 영화</h2>
        <div className={styles.movieGrid}>
          {similarMovies.length > 0 ? (
            similarMovies.map((movie) => (
              <Link
                href={`/detail/${movie.id}`}
                key={movie.id}
                className={styles.movieCard}
              >
                <div className={styles.movieItem}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : "/placeholder-poster.png"
                    }
                    alt={movie.title}
                    className={styles.movieThumbnail}
                  />
                  <p className={styles.movieCardTitle}>{movie.title}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className={styles.noMovies}>비슷한 영화가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
