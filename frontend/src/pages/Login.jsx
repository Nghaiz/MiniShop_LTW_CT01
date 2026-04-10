import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

function Login() {
  const { user, login } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const cardClass =
    "rounded-2xl border border-zinc-200 bg-white p-6 transition-colors dark:border-zinc-700 dark:bg-zinc-800/70 sm:p-8";

  if (user) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <div className={cardClass}>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              Route /login
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Đã đăng nhập
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Bạn đang đăng nhập với tên <strong>{user}</strong>
            </p>
          </div>
          <button
            className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 sm:w-auto"
            onClick={() => navigate("/profile")}
          >
            Xem trang cá nhân
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Vui lòng nhập username");
      return;
    }

    setSubmitting(true);
    const result = await login(username);
    setSubmitting(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className={cardClass}>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Route /login
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Đăng nhập
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Nhập username để đăng nhập vào hệ thống
          </p>
        </div>

        <div className="my-5 h-px bg-zinc-200 dark:bg-zinc-700" />

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400"
              placeholder="Nhập username của bạn"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              autoFocus
              autoComplete="username"
            />
            {error && (
              <div className="text-sm font-medium text-red-600 dark:text-red-400">
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            disabled={submitting}
          >
            {submitting ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          Username được lưu bằng <strong>Session</strong> trên server. Khi đóng
          trình duyệt hoặc session hết hạn, bạn cần đăng nhập lại.
        </div>
      </div>
    </div>
  );
}

export default Login;
