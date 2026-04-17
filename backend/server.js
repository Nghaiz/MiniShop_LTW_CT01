const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "minishop-ltw-ct01-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);
app.get("/api/home", (req, res) => {
  const theme = req.cookies.theme || "light";
  const username = req.session.username || null;
  res.json({ theme, username });
});
app.post("/api/login", (req, res) => {
  const { username } = req.body;

  if (!username || username.trim() === "") {
    return res.status(400).json({ error: "Vui lòng nhập username" });
  }

  req.session.username = username.trim();
  req.session.loginTime = new Date().toISOString();
  req.session.profileVisits = 0;

  res.json({
    success: true,
    username: req.session.username,
  });
});
app.get("/api/profile", (req, res) => {
  if (!req.session.username) {
    return res.status(401).json({ error: "Chưa đăng nhập" });
  }

  req.session.profileVisits = (req.session.profileVisits || 0) + 1;

  res.json({
    username: req.session.username,
    loginTime: req.session.loginTime,
    profileVisits: req.session.profileVisits,
  });
});
app.get("/api/logout", (req, res) => {
  if (!req.session.username){
    return res.status(401).json({ error: "Chưa đăng nhập" });
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Không thể đăng xuất" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});
app.get("/api/set-theme/:theme", (req, res) => {
  const { theme } = req.params;

  if (theme !== "light" && theme !== "dark") {
    return res
      .status(400)
      .json({ error: 'Theme chỉ chấp nhận "light" hoặc "dark"' });
  }

  res.cookie("theme", theme, {
    maxAge: 10 * 60 * 1000,
    httpOnly: false,
    sameSite: "lax",
  });

  res.json({ success: true, theme });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

