import React, { useState } from 'react';
import { contentService } from '../services/api';
import { toast } from 'react-toastify';
import { Video, FileText, PlusCircle, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    pdfUrl: '',
    stage: 'prep', // المرحلة الافتراضية
    xpPoints: 20
  });

  const { title, description, videoUrl, pdfUrl, stage, xpPoints } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await contentService.addLesson(formData);
      toast.success('تم نشر الدرس بنجاح! 🚀');
      
      // تفريغ الخانات بعد النشر
      setFormData({
        title: '',
        description: '',
        videoUrl: '',
        pdfUrl: '',
        stage: 'prep',
        xpPoints: 20
      });
      
    } catch (err) {
      toast.error('حدث خطأ أثناء النشر');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* الهيدر */}
        <div className="bg-primary text-white p-6 rounded-2xl shadow-lg mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <LayoutDashboard /> غرفة التحكم
            </h1>
            <p className="opacity-90 mt-1">أضف الدروس والمحتوى التعليمي من هنا</p>
          </div>
        </div>

        {/* استمارة إضافة درس */}
        <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-secondary">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <PlusCircle className="text-secondary" /> إضافة درس جديد
          </h2>

          <form onSubmit={onSubmit} className="space-y-6">
            
            {/* عنوان الدرس */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">عنوان الدرس</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                placeholder="مثال: Unit 1 - The White Knight"
                className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
                required
              />
            </div>

            {/* الوصف */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">وصف قصير</label>
              <textarea
                name="description"
                value={description}
                onChange={onChange}
                placeholder="ماذا سيتعلم الطالب في هذا الدرس؟"
                className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* رابط الفيديو */}
              <div>
                <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
                  <Video size={18} /> رابط الفيديو (YouTube)
                </label>
                <input
                  type="text"
                  name="videoUrl"
                  value={videoUrl}
                  onChange={onChange}
                  placeholder="https://youtube.com/..."
                  className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              {/* رابط المذكرة */}
              <div>
                <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
                  <FileText size={18} /> رابط المذكرة (PDF)
                </label>
                <input
                  type="text"
                  name="pdfUrl"
                  value={pdfUrl}
                  onChange={onChange}
                  placeholder="رابط جوجل درايف أو مباشر"
                  className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* المرحلة */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">المرحلة الدراسية</label>
                <select
                  name="stage"
                  value={stage}
                  onChange={onChange}
                  className="w-full p-3 border rounded-lg bg-white"
                >
                  <option value="prim">الابتدائية</option>
                  <option value="prep">الإعدادية</option>
                  <option value="sec">الثانوية</option>
                </select>
              </div>

              {/* نقاط XP */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">نقاط المكافأة (XP)</label>
                <input
                  type="number"
                  name="xpPoints"
                  value={xpPoints}
                  onChange={onChange}
                  className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* زر النشر */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition shadow-lg hover:shadow-xl"
            >
              نشر الدرس الآن 🚀
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;