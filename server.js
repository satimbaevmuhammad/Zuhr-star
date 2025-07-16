const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./src/config/db'); // ← добавьте эту строку
connectDB(); // ← и эту строку
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
});
