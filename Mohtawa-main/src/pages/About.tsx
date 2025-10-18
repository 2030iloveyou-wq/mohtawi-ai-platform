import { Target, Users, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: Target,
      title: language === 'ar' ? 'هدفنا' : 'Our Goal',
      description: language === 'ar'
        ? 'تمكين المبدعين والشركات من إنتاج محتوى استثنائي بسرعة وكفاءة'
        : 'Empower creators and businesses to produce exceptional content quickly and efficiently',
    },
    {
      icon: Users,
      title: language === 'ar' ? 'فريقنا' : 'Our Team',
      description: language === 'ar'
        ? 'مجموعة من الخبراء في الذكاء الاصطناعي والتكنولوجيا ملتزمون بالابتكار'
        : 'A group of AI and technology experts committed to innovation',
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'التكنولوجيا' : 'Technology',
      description: language === 'ar'
        ? 'نستخدم أحدث تقنيات الذكاء الاصطناعي لتوفير أفضل تجربة للمستخدمين'
        : 'We use the latest AI technologies to provide the best user experience',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent leading-tight">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('about.mission')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl flex items-center justify-center mb-6">
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'انضم إلى محتواي اليوم' : 'Join Mohtawi Today'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'ar'
              ? 'ذكاء يصنع المحتوى العربي - ابدأ رحلتك الآن'
              : 'Intelligence that creates Arabic content - Start your journey now'}
          </p>
        </div>
      </div>
    </div>
  );
}
