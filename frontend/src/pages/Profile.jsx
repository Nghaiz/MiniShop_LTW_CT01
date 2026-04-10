import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

function Profile() {
  const { logout } = useContext(AppContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const cardClass =
    "rounded-2xl border border-zinc-200 bg-white p-6 transition-colors dark:border-zinc-700 dark:bg-zinc-800/70 sm:p-8";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        const data = await res.json();
        setProfileData(data);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <div className={cardClass}>
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-3">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100" />
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Đang tải thông tin...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) return null;

  const formatLoginTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <section className={cardClass}>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
            Route /profile
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Trang cá nhân
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Thông tin phiên đăng nhập hiện tại
          </p>
        </div>

        <div className="my-5 h-px bg-zinc-200 dark:bg-zinc-700" />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/70">
            <div className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              Username
            </div>
            <div className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {profileData.username}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/70">
            <div className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              Thời điểm đăng nhập
            </div>
            <div className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {formatLoginTime(profileData.loginTime)}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/70 sm:col-span-2">
            <div className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
              Số lần truy cập trang này
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="inline-flex min-w-8 items-center justify-center rounded-md bg-zinc-900 px-2 py-1 text-sm font-bold text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900">
                {profileData.profileVisits}
              </span>
              <span>lần (trong phiên hiện tại)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          Mỗi lần <strong>F5 / reload</strong> trang này, bộ đếm sẽ tăng lên 1.
          Dữ liệu được lưu trong <strong>Session</strong> trên server.
        </div>
      </section>

      <section className={cardClass}>
        <div className="max-w-sm">
          <button
            className="w-full rounded-lg border border-red-500 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-950/30"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
        </div>
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          Đăng xuất sẽ <strong>xóa toàn bộ Session</strong>. Bạn cần đăng nhập
          lại để truy cập trang này.
        </div>
      </section>
    </div>
  );
}

export default Profile;
