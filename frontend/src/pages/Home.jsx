import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

function Home() {
  const { user, theme } = useContext(AppContext);
  const cardClass =
    "rounded-2xl border border-zinc-200 bg-white p-6 transition-colors dark:border-zinc-700 dark:bg-zinc-800/70 sm:p-8";

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <section className={cardClass}>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Trang chủ /
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Mini Profile App
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Ứng dụng demo Cookie và Session
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
            <p className="text-xs uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              Trạng thái
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {user ? (
                <>
                  Xin chào, <span className="font-semibold">{user}</span>
                </>
              ) : (
                "Bạn chưa đăng nhập"
              )}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
            <p className="text-xs uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              Theme từ Cookie
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {theme}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          Giao diện đang được đồng bộ theo cookie theme (light/dark), thời gian
          sống 10 phút. Bạn có thể đổi theme bằng nút toggle trên thanh header.
        </div>
      </section>

      {!user && (
        <section className={cardClass}>
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">
            Hãy{" "}
            <Link
              to="/login"
              className="font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-4 dark:text-zinc-100 dark:decoration-zinc-500"
            >
              đăng nhập
            </Link>{" "}
            để xem trang cá nhân
          </p>
        </section>
      )}

      {user && (
        <section className={cardClass}>
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">
            Xem{" "}
            <Link
              to="/profile"
              className="font-semibold text-zinc-900 underline decoration-zinc-400 underline-offset-4 dark:text-zinc-100 dark:decoration-zinc-500"
            >
              trang cá nhân
            </Link>{" "}
            của bạn
          </p>
        </section>
      )}
    </div>
  );
}

export default Home;
