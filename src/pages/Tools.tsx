import { FileText, Share2, Megaphone, Package, Mail, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ToolsProps {
  onNavigate: (page: string) => void;
}

export default function Tools({ onNavigate }: ToolsProps) {
  const { t, language } = useLanguage();

  const tools = [
    {
      icon: FileText,
      nameKey: 'tools.blog.name',
      descKey: 'tools.blog.desc',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      icon: Share2,
      nameKey: 'tools.social.name',
      descKey: 'tools.social.desc',
      gradient: 'from-violet-600 to-purple-600',
    },
    {
      icon: Megaphone,
      nameKey: 'tools.ads.name',
      descKey: 'tools.ads.desc',
      gradient: 'from-pink-600 to-rose-600',
    },
    {
      icon: Package,
      nameKey: 'tools.product.name',
      descKey: 'tools.product.desc',
      gradient: 'from-orange-600 to-amber-600',
    },
    {
      icon: Mail,
      nameKey: 'tools.email.name',
      descKey: 'tools.email.desc',
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      icon: Sparkles,
      nameKey: 'tools.other.name',
      descKey: 'tools.other.desc',
      gradient: 'from-indigo-600 to-blue-600',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {language === 'ar' ? '6 أدوات قوية للذكاء الاصطناعي' : '6 Powerful AI Tools'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {t('tools.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'ar'
              ? 'اختر الأداة المناسبة لاحتياجاتك وابدأ في إنشاء محتوى استثنائي بسرعة وسهولة'
              : 'Choose the right tool for your needs and start creating exceptional content quickly and easily'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <button
              key={index}
              onClick={() => onNavigate('dashboard')}
              className="group relative p-8 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 hover-lift text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 ${tool.gradient}"></div>

              <div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                {t(tool.nameKey)}
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                {t(tool.descKey)}
              </p>

              <div className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>{t('cta.start')}</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
