import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../services/api'; // استدعاء خدمة المحتوى
import { Trophy, Coins, Star, LogOut, BookOpen, PlayCircle, Video } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]); // مخزن الدروس
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 1. التأكد من وجود الطالب
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        navigate('/register');
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      try {
        // 2. جلب الدروس الخاصة بمرحلة الطالب من السيرفر 📡
        const res = await contentService.getLessons(parsedUser.stage);
        setLessons(res.data); // تخزين الدروس الحقيقية
      } catch (err) {
        console.error("فشل في جلب الدروس");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/register');
  };

  // دالة لفتح الفيديو (مؤقتاً في لسان جديد)
  const openLesson = (url) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-blue-600 font-bold">جاري تحميل مملكته... 🚀</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* الهيدر */}
      <div className="bg-blue-600 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">أهلاً يا بطل! 👋</h1>
            <p className="text-xl mt-1 opacity-90">{user.name}</p>
            <div className="mt-2 inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm">
              <Star className="w-4 h-4 ml-1 text-yellow-300 fill-yellow-300" />
              المستوى: {user.level || 1}
            </div>
          </div>
          <button onClick={handleLogout} className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* كروت الإحصائيات */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex flex-col items-center">
            <Trophy className="w-8 h-8 text-yellow-300 mb-2" />
            <span className="text-2xl font-bold">{user.xp || 50}</span>
            <span className="text-xs opacity-80">XP نقطة</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex flex-col items-center">
            <Coins className="w-8 h-8 text-yellow-400 mb-2" />
            <span className="text-2xl font-bold">{user.coins || 100}</span>
            <span className="text-xs opacity-80">عملة ذهبية</span>
          </div>
        </div>
      </div>

      {/* منطقة الدروس الحقيقية */}
      <div className="px-4 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <BookOpen className="ml-2 text-blue-600" /> دروسي الحالية
        </h2>
        
        {lessons.length === 0 ? (
          <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-sm">
            <p>لا توجد دروس متاحة حالياً لمرحلتك الدراسية 📭</p>
            <p className="text-sm mt-2">انتظر المستر يرفع الدروس قريباً!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div key={lesson._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition cursor-pointer group">
                {/* أيقونة الدرس */}
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <PlayCircle className="w-6 h-6" />
                </div>
                
                {/* تفاصيل الدرس */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 line-clamp-1">{lesson.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{lesson.description}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs font-bold text-yellow-600">
                    <Trophy className="w-3 h-3" /> +{lesson.xpPoints} XP
                  </div>
                </div>

                {/* زر المشاهدة */}
                <button 
                  onClick={() => openLesson(lesson.videoUrl)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 hover:scale-105 transition"
                >
                  شاهد
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;