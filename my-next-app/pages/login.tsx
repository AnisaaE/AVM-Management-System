import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Giriş başarılı!");
        router.push("/dashboard");
      } else {
        setError(data.message || "Bir hata oluştu.");
      }
    } catch {
      setError("Sunucu hatası.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const form = document.querySelector("form");
        form?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (error) setError("");
  }, [email, password]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, rgb(177, 109, 237), rgb(78, 33, 176))"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "60px",
        borderRadius: "16px",
        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
        width: "100%",
        maxWidth: "500px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontSize: "28px" }}>
          Giriş Yap
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 25 }}>
            <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "16px"
              }}
            />
          </div>

          <div style={{ marginBottom: 25 }}>
            <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Şifre</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 40px 12px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "16px"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px"
                }}
                aria-label="Şifreyi Göster/Gizle"
              >
                {showPassword ? "👁️‍🗨️" : "👁"}
              </button>
            </div>
          </div>

          {error && <p style={{ color: "red", marginBottom: 15 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#aaa" : "#2193b0",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              transition: "background 0.3s"
            }}
            onMouseOver={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#176B87";
            }}
            onMouseOut={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#2193b0";
            }}
          >
            {loading ? "Yükleniyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}


