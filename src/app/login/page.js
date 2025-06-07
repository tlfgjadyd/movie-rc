"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/firebaseAuth";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    const { user, error } = await signInWithGoogle();
    if (error) {
      //console.error(error.message);
      alert("로그인 실패: " + error.message);
    } else {
      console.log("로그인 성공:", user);
      router.push("/"); // 로그인 후 홈으로 이동
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div>
      <header
        style={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          MovLib
        </h1>
      </header>
      <form
        onSubmit={handleLogin}
        style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}
      >
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ width: "100%", padding: "0.75rem" }}>
          로그인
        </button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "inline-block", cursor: "pointer" }}
          onClick={handleGoogleLogin}
        >
          구글로 로그인 / 회원가입
        </div>
      </div>
    </div>
  );
}
