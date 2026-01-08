import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Shield,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading) return null;
  if (isAuthenticated) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg("Username dan password wajib diisi.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    setTimeout(async () => {
      const result = await login(username, password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setErrorMsg(result.message);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-black dark:via-slate-900 dark:to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0),rgba(0,0,0,0.8))]"></div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative w-full max-w-md z-10">
        {/* Main Card with Glassmorphism */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-700 animate-pulse-slow"></div>

          <div className="relative backdrop-blur-2xl bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500"></div>

            {/* Header Section */}
            <div className="relative p-8 text-center overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>

              {/* Sparkle Effects */}
              <div className="absolute top-4 right-4 text-amber-400/40 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div
                className="absolute bottom-4 left-4 text-blue-400/40 animate-pulse"
                style={{ animationDelay: "1s" }}
              >
                <Sparkles className="w-3 h-3" />
              </div>

              <div className="relative z-10 flex flex-col items-center space-y-4">
                {/* Logo Container with 3D Effect */}
                <div className="relative group/logo">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl blur-md opacity-60 group-hover/logo:opacity-100 transition-opacity"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-2xl p-3 shadow-2xl transform group-hover/logo:scale-105 transition-transform duration-300 border-2 border-amber-300/50">
                    <img
                      src="/logo_dinas.png"
                      alt="Logo Dinas"
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Title with Gradient */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                    Dinas Pendidikan
                  </h1>
                  <p className="text-amber-400 text-sm font-bold uppercase tracking-[0.3em] drop-shadow-md">
                    Kabupaten Cirebon
                  </p>
                </div>

                {/* Subtitle Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                  <Shield className="w-4 h-4 text-blue-300" />
                  <p className="text-xs text-blue-100 font-semibold tracking-wide">
                    Sistem Arsip Ijazah Digital
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8 md:p-10 space-y-6">
              {/* Error Message */}
              {errorMsg && (
                <div className="relative overflow-hidden rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-500/30 p-4 animate-in slide-in-from-top-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
                  <div className="relative flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-red-200 font-medium">
                      {errorMsg}
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-blue-200/80 uppercase tracking-widest ml-1">
                    Username
                  </label>
                  <div className="relative group/input">
                    {/* Input Glow */}
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover/input:opacity-20 blur transition-opacity ${
                        focusedInput === "username" ? "opacity-40" : ""
                      }`}
                    ></div>

                    <div className="relative flex items-center">
                      <div className="absolute left-4 pointer-events-none">
                        <User
                          className={`w-5 h-5 transition-all duration-300 ${
                            focusedInput === "username"
                              ? "text-blue-400 scale-110"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 hover:bg-white/8"
                        placeholder="Masukkan Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setFocusedInput("username")}
                        onBlur={() => setFocusedInput(null)}
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-blue-200/80 uppercase tracking-widest ml-1">
                    Password
                  </label>
                  <div className="relative group/input">
                    {/* Input Glow */}
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover/input:opacity-20 blur transition-opacity ${
                        focusedInput === "password" ? "opacity-40" : ""
                      }`}
                    ></div>

                    <div className="relative flex items-center">
                      <div className="absolute left-4 pointer-events-none">
                        <Lock
                          className={`w-5 h-5 transition-all duration-300 ${
                            focusedInput === "password"
                              ? "text-purple-400 scale-110"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <input
                        type="password"
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 hover:bg-white/8"
                        placeholder="Masukkan Kata Sandi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full group/btn overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Button Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] group-hover/btn:animate-gradient-x"></div>

                    {/* Button Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/btn:opacity-30 blur-xl transition-opacity"></div>

                    {/* Button Content */}
                    <div className="relative px-6 py-4 flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span className="text-white font-bold text-base">
                            Memproses...
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-white font-bold text-base tracking-wide">
                            Masuk Aplikasi
                          </span>
                          <ArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="relative px-8 py-5 text-center border-t border-white/10 bg-black/20 backdrop-blur-sm">
              <p className="text-xs text-gray-400 leading-relaxed">
                &copy; {new Date().getFullYear()} Dinas Pendidikan Kabupaten
                Cirebon
                <br />
                <span className="text-gray-500">
                  Hak Cipta Dilindungi Undang-Undang
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Shadow */}
        <div className="absolute -bottom-8 left-8 right-8 h-12 bg-gradient-to-r from-blue-600/20 via-purple-600/30 to-blue-600/20 blur-2xl rounded-full"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
