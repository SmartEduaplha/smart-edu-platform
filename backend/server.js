const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 👇 استدعاء الملفات (لازم يكونوا موجودين هنا)
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes'); // 👈 ده السطر اللي كان ناقص!

dotenv.config();
const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

app.get('/', (req, res) => {
    res.send("<h1>Server is Running</h1>");
});

// 👇 تشغيل الطرق (Routes)
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes); // استخدام الملفات هنا

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;