"use client";
import { useRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DateRangePicker from "./DateRangePicker";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Header({
  onOpenMenu,
  onTitleClick,
  query,
  setQuery,
  genreName,
  handleDateRangeChange,
  startDate,
  endDate,
  setStartDate,
  fetchSearch,
  setEndDate,
}) {
  // 포커스가 지맘대로 움직이는 상황 발생

  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const searchInputRef = useRef(null);

  // 검색어 변경 핸들러 - 직접 상태 업데이트
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (query.trim()) {
        fetchSearch(query, 1);
      }
      // Enter 키를 누른 후 검색창에서 포커스 제거
      searchInputRef.current.blur();
    }
  };

  // 클릭 이벤트가 발생할 때 자동 포커스를 방지하기 위한 이벤트 리스너
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // 클릭한 요소가 검색 input이 아닌 경우에만 처리
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        // 다른 요소 클릭 시 검색창 포커스 방지를 위한 로직
        // 페이지 네이션 누르면 자꾸 올라가서 영화사진 클릭함;;
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      {/* Header */}
      <header
        style={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Title
        </h1>
        {!loading &&
          (user ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <>
              <button onClick={() => router.push("/login")}>로그인</button>
              <button onClick={() => router.push("/signup")}>회원가입</button>
            </>
          ))}
      </header>
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
      <hr />
      {/* Search */}
      <div>
        <input
          ref={searchInputRef} // ref 연결
          type="text"
          placeholder="영화 제목 검색"
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          style={{
            padding: "0.5rem",
            width: "300px",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        />
        {/* Search for Date */}
        <DateRangePicker
          onDateRangeChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
      {/* Title */}
      <h2 style={{ display: query ? "none" : "block" }}>
        인기 영화 {genreName && `: ${genreName}`}
      </h2>
    </div>
  );
}
