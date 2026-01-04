import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../integrations/supabase/client";

export default function LandingAuthPage() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectByRole = () => {
    if (role === "admin") router.push("/admin-dashboard");
    if (role === "student") router.push("/student-dashboard");
    if (role === "valet") router.push("/valet-dashboard");
  };

  const handleAuth = async () => {
    setError("");
    setLoading(true);

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      await supabase.from("profiles").insert({
        id: data.user?.id,
        email,
        role,
      });

      redirectByRole();
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      redirectByRole();
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#050816] via-[#120b2f] to-[#0b051a] px-4">

      {/* GLOW BLOBS */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[120px]" />

      {/* MAIN CARD */}
      <div className="relative w-full max-w-6xl grid md:grid-cols-2
                      bg-white/10 backdrop-blur-2xl
                      border border-white/20
                      rounded-[2rem]
                      shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                      overflow-hidden animate-fadeUp">

        {/* LEFT / HERO */}
        <div className="hidden md:flex flex-col justify-center p-12 text-white">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Smart <span className="text-indigo-400">Parking</span>
            <br /> Management
          </h1>

          <p className="text-lg opacity-85 mb-8">
            A next‑generation parking system for college events —
            fast, real‑time, and role‑based.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              🚗 Slot Booking
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              🎫 QR Tickets
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              📊 Admin Analytics
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              ⚡ Supabase Realtime
            </div>
          </div>
        </div>

        {/* RIGHT / AUTH */}
        <div className="bg-white p-10 md:p-12 text-gray-900">
          <h2 className="text-3xl font-bold mb-2">
            {isSignup ? "Create Account" : "Welcome Back!"}
          </h2>

          <p className="text-gray-500 mb-6">
            {isSignup
              ? "Sign up to access the system"
              : "Login to your dashboard"}
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email address"
            className="w-full mb-4 p-3 rounded-xl border
                       focus:ring-2 focus:ring-indigo-500
                       transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded-xl border
                       focus:ring-2 focus:ring-indigo-500
                       transition"
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full mb-6 p-3 rounded-xl border
                       focus:ring-2 focus:ring-indigo-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="valet">Valet</option>
          </select>

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600
                       hover:scale-[1.03] transition-transform
                       shadow-lg disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>

          <p className="text-sm text-center mt-6">
            {isSignup ? "Already have an account?" : "New here?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {isSignup ? "Login" : "Create account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
