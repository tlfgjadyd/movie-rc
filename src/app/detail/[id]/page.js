// 페이지 안에 async랑 useclient사용 못해서 여기서는 fetch

import DetailClient from "@/components/DetailClient";

export default async function DetailPage({ params }) {
  const { id } = params;

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  // 데이터 fetch
  const [movieRes, recommendRes, similarRes] = await Promise.all([
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`),
    fetch(
      `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=ko-KR&page=1`
    ),
    fetch(
      `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=ko-KR&page=1`
    ),
  ]);

  const movie = await movieRes.json();
  const recommendMovies = (await recommendRes.json()).results.slice(0, 5) || [];
  const similarMovies = (await similarRes.json()).results.slice(0, 5) || [];

  return (
    <DetailClient
      movie={movie}
      recommendMovies={recommendMovies}
      similarMovies={similarMovies}
    />
  );
}
