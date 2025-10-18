import { useState, useEffect } from 'react';
import { Image, Video, Trash2, Download, Loader2, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth, supabase } from '../contexts/AuthContext';

interface Creation {
  id: string;
  type: 'image' | 'video';
  prompt: string;
  url: string;
  style?: string;
  duration?: number;
  created_at: string;
}

interface MyCreationsProps {
  onNavigate: (page: string) => void;
}

export default function MyCreations({ onNavigate }: MyCreationsProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  useEffect(() => {
    if (user) {
      loadCreations();
    }
  }, [user, filter]);

  const loadCreations = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('creations')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('type', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCreations(data || []);
    } catch (err) {
      console.error('Error loading creations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(language === 'ar' ? 'هل تريد حذف هذا العمل؟' : 'Delete this creation?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('creations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCreations(creations.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting creation:', err);
    }
  };

  const handleDownload = async (url: string, type: 'image' | 'video') => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `mohtawa-${type}-${Date.now()}.${type === 'image' ? 'jpg' : 'mp4'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading:', err);
    }
  };

  if (!user) {
    onNavigate('login');
    return null;
  }

  const filteredCreations = creations;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 mb-4"
          >
            ← {language === 'ar' ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'أعمالي' : 'My Creations'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'ar'
                  ? 'جميع الصور والفيديوهات التي أنشأتها'
                  : 'All your AI-generated images and videos'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'image' | 'video')}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="all">{language === 'ar' ? 'الكل' : 'All'}</option>
                <option value="image">{language === 'ar' ? 'الصور' : 'Images'}</option>
                <option value="video">{language === 'ar' ? 'الفيديوهات' : 'Videos'}</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredCreations.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              {filter === 'image' ? (
                <Image className="w-12 h-12 text-gray-400" />
              ) : filter === 'video' ? (
                <Video className="w-12 h-12 text-gray-400" />
              ) : (
                <div className="flex gap-2">
                  <Image className="w-8 h-8 text-gray-400" />
                  <Video className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'لا توجد إبداعات بعد' : 'No creations yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {language === 'ar'
                ? 'ابدأ بإنشاء صورك وفيديوهاتك الأولى'
                : 'Start creating your first images and videos'}
            </p>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreations.map((creation) => (
              <div
                key={creation.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover-lift"
              >
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                  {creation.type === 'image' ? (
                    <img
                      src={creation.url}
                      alt={creation.prompt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={creation.url}
                        className="w-full h-full object-cover"
                        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23111827' width='800' height='600'/%3E%3C/svg%3E"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                          <Video className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      creation.type === 'image'
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                        : 'bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400'
                    }`}>
                      {creation.type === 'image'
                        ? (language === 'ar' ? 'صورة' : 'Image')
                        : (language === 'ar' ? 'فيديو' : 'Video')
                      }
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                    {creation.prompt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>
                      {new Date(creation.created_at).toLocaleDateString(
                        language === 'ar' ? 'ar-EG' : 'en-US'
                      )}
                    </span>
                    {creation.duration && (
                      <span>{creation.duration} {language === 'ar' ? 'ث' : 's'}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(creation.url, creation.type)}
                      className="flex-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {language === 'ar' ? 'تحميل' : 'Download'}
                    </button>
                    <button
                      onClick={() => handleDelete(creation.id)}
                      className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
