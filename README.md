This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# memo

메뉴 사이드바 열어서 장르 클릭하고
하단 네비게이션 누르면 타이틀은 인기영화:장르인데
정작 나오는건 모든장르 통합임 이거 고쳐야함
(완)

0513
비슷한 문제인데
검색하고 하단 네비 누르면 다시 그냥 인기영화로 됨
(완)

장르 -> 검색이 안되고
장르 -> 검색 -> 검색 없애면 인기영화:장르인데 그냥 인기영화임
장르 -> 검색은 못하게 함
(완)

리펙토링
(완)

2. 연도별 필터링 -> UI는 추가, 기능은 아직 X
   기능까지
   (완)
3. 로그인 기능 추가
   (추후 예정 : 로그인 후 좋아요 버튼 추가해서 볼 수 있도록)
4. ai 빼고 api의 recomand이용해서 추천 -> 디테일에서
   (완)

```
https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&sort_by=release_date.desc&region=KR&primary_release_year=2024&page=1

디테일에
https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=YOUR_API_KEY&page=1
이용해서 추천하기
slice(0,5) 이용해서 자르기
```

(완)

추후 장르별 체크박스로 만들어서 여러개 하기
