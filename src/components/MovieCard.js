export default function MovieCard({ movie }) {
  return (
    <div style={{ width: "200px", cursor: "pointer" }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "100%", padding: "10px" }}
      />
      <h3>{movie.title}</h3>
    </div>
  );
}
