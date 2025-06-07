"use client";

import { useState } from "react";
import { signUpWithEmail } from "@/lib/firebaseAuth";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/firebaseAuth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { user, error } = await signUpWithEmail(email, password);
    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/"); // 회원가입 성공 시 홈으로 이동
    }
  };

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

  return (
    <div style={{ padding: "2rem" }}>
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
        onSubmit={handleSignup}
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <h2>회원가입</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 (6자 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">회원가입</button>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
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
