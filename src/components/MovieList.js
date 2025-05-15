import Link from "next/link";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
        width: "100%",
      }}
    >
      {movies.map((movie) => (
        <Link key={movie.id} href={`/detail/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}
