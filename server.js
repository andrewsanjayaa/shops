const express = require("express");
const path = require("path");
const compression = require("compression");
const db = require("./db");
const app = express();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const testimoniRoutes = require("./routes/testiRoutes");

// Middleware
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));  

app.use("/api/products", productRoutes);
app.use("/users", userRoutes);
app.use("/about", aboutRoutes);
app.use("/testimonials", testimoniRoutes);

// Route: SIGNUP
app.post("/api/signup", async (req, res) => {
  const start = Date.now();
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    return res.json({ success: false, error: "Semua field wajib diisi." });
  }
  if (password !== confirmPassword) {
    return res.json({ success: false, error: "Password dan konfirmasi tidak cocok." });
  }

  try {
    const existingUser = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    if (existingUser.rows.length > 0) {
      return res.json({ success: false, error: "Username sudah terdaftar." });
    }

    await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);

    console.log(`Signup selesai dalam ${Date.now() - start} ms`);
    return res.json({ success: true });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Route: LOGIN
app.post("/api/login", async (req, res) => {
  const start = Date.now();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, error: "Username dan password wajib diisi." });
  }

  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1 AND password = $2", [
      username,
      password,
    ]);

    if (result.rows.length > 0) {
      console.log(`Login selesai dalam ${Date.now() - start} ms`);
      res.json({success:true});

    } else {
      return res.json({ success: false, error: "Username atau password salah." });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, error: "Server error." });
  }
});

app.listen(3000, () => {
  console.log(`Server berjalan di http://localhost:3000`);
});
