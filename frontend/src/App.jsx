import { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

export const AppContext = createContext();

function getInitialTheme() {
  if (typeof document === "undefined") return "light";

  const matchedTheme = document.cookie.match(
    /(?:^|;\s*)theme=(light|dark)(?:;|$)/
  )?.[1];

  if (matchedTheme === "light" || matchedTheme === "dark") {
    return matchedTheme;
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function SunIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.2 14.7A8.5 8.5 0 1 1 9.3 3.8a7.2 7.2 0 1 0 10.9 10.9Z" />
    </svg>
  );
}

function Navbar() {
  const location = useLocation();
  const { theme, changeTheme } = useContext(AppContext);
  const isDark = theme === "dark";

  const toggleTheme = () => {
    changeTheme(isDark ? "light" : "dark");
  };

  const navItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/login", label: "Đăng nhập" },
    { path: "/profile", label: "Cá nhân" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="shrink-0">
          <p className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-lg">
            Mini Profile App
          </p>
          <p className="text-[11px] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400 sm:text-xs">
            Cookie và Session Demo
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-800">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="relative h-10 w-[86px] rounded-full border border-zinc-300 bg-zinc-100 p-1 transition-colors duration-300 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-500"
            aria-label="Chuyển giao diện sáng hoặc tối"
            aria-pressed={isDark}
          >
            <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
              <SunIcon className="h-4 w-4 text-amber-500" />
              <MoonIcon className="h-4 w-4 text-indigo-300 dark:text-indigo-200" />
            </span>
            <span
              className={`absolute left-1 top-1 grid h-8 w-8 place-items-center rounded-full bg-zinc-900 text-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out dark:bg-zinc-100 dark:text-zinc-900 ${
                isDark ? "translate-x-[46px]" : "translate-x-0"
              }`}
            >
              <SunIcon
                className={`absolute h-4 w-4 transition-opacity duration-200 ${
                  isDark ? "opacity-0" : "opacity-100"
                }`}
              />
              <MoonIcon
                className={`absolute h-4 w-4 transition-opacity duration-200 ${
                  isDark ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-zinc-50 font-['Be_Vietnam_Pro',_sans-serif] text-zinc-900 antialiased transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHomeData = async () => {
    try {
      const res = await fetch("/api/home");
      const data = await res.json();
      setTheme(data.theme || "light");
      setUser(data.username);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [theme]);

  const changeTheme = async (newTheme) => {
    try {
      const res = await fetch(`/api/set-theme/${newTheme}`);
      if (res.ok) {
        setTheme(newTheme);
      }
    } catch {
    }
  };

  const login = async (username) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.username);
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const logout = async () => {
    try {
      await fetch("/api/logout");
      setUser(null);
    } catch {
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-['Be_Vietnam_Pro',_sans-serif] dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-100/80 px-8 py-6 dark:border-zinc-700 dark:bg-zinc-800/80">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100" />
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ theme, changeTheme, user, login, logout }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

