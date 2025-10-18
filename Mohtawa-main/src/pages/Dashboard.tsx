import { useState } from 'react';
import { Image, Video, FileText, Folder, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import ImageGenerator from '../components/ImageGenerator';
import VideoGenerator from '../components/VideoGenerator';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [selectedTool, setSelectedTool] = useState<'text' | 'image' | 'video'>('image');

  const getUserDisplayName = () => {
    return user?.user_metadata?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  };

  const tools = [
    {
      id: 'image' as const,
      name: language === 'ar' ? 'مولّد الصور' : 'Image Generator',
      icon: Image,
      gradient: 'from-blue-600 to-cyan-600',
      description: language === 'ar' ? 'أنشئ صوراً إبداعية بالذكاء الاصطناعي' : 'Create creative images with AI'
    },
    {
      id: 'video' as const,
      name: language === 'ar' ? 'مولّد الفيديو' : 'Video Generator',
      icon: Video,
      gradient: 'from-violet-600 to-purple-600',
      description: language === 'ar' ? 'أنشئ فيديوهات احترافية بالذكاء الاصطناعي' : 'Create professional videos with AI'
    },
    {
      id: 'text' as const,
      name: language === 'ar' ? 'مولّد النصوص' : 'Text Generator',
      icon: FileText,
      gradient: 'from-green-600 to-emerald-600',
      description: language === 'ar' ? 'اكتب محتوى تسويقي وإبداعي' : 'Write marketing and creative content'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {language === 'ar' ? 'مرحباً' : 'Welcome'}, {getUserDisplayName()}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent leading-tight">
            {language === 'ar' ? 'أنشئ صورك وفيديوهاتك بالذكاء الاصطناعي' : 'Create Images & Videos with AI'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'في لحظات – حوّل أفكارك إلى محتوى مرئي مذهل'
              : 'In moments – turn your ideas into stunning visual content'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover-lift text-left ${
                selectedTool === tool.id
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tool.description}
              </p>
            </button>
          ))}
        </div>

        <div className="mb-8 flex justify-center">
          <button
            onClick={() => onNavigate('my-creations')}
            className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 flex items-center gap-2"
          >
            <Folder className="w-5 h-5" />
            {language === 'ar' ? 'أعمالي' : 'My Creations'}
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-1">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8">
            {selectedTool === 'image' && <ImageGenerator />}
            {selectedTool === 'video' && <VideoGenerator />}
            {selectedTool === 'text' && (
              <div className="text-center py-20">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'ar' ? 'مولّد النصوص' : 'Text Generator'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {language === 'ar'
                    ? 'قريباً... سيتم إضافة مولّد النصوص بالذكاء الاصطناعي'
                    : 'Coming soon... AI text generator will be added'}
                </p>
                <button
                  onClick={() => setSelectedTool('image')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {language === 'ar' ? 'جرّب مولّد الصور' : 'Try Image Generator'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
