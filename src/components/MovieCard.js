export default function MovieCard({ movie }) {
  return (
    <div style={{ width: "100%", cursor: "pointer" }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "100%", display: "block", borderRadius: "8px" }}
      />
      <h3 style={{ marginTop: "0.5rem", fontSize: "1rem" }}>{movie.title}</h3>
    </div>
  );
}
