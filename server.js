const dotenv = require('dotenv');
dotenv.config();

const app = require('./app'); // app.js fayldan `app` ni import qilamiz

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
