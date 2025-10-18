import { Sparkles, Zap, Globe, Wand2, Users, TrendingUp, Award, Play, Check, Star, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Zap,
      titleKey: 'features.fast.title',
      descKey: 'features.fast.desc',
    },
    {
      icon: Globe,
      titleKey: 'features.bilingual.title',
      descKey: 'features.bilingual.desc',
    },
    {
      icon: Wand2,
      titleKey: 'features.variety.title',
      descKey: 'features.variety.desc',
    },
  ];

  const stats = [
    {
      icon: Users,
      value: language === 'ar' ? '+10,000' : '10,000+',
      label: language === 'ar' ? 'مستخدم نشط' : 'Active Users',
    },
    {
      icon: TrendingUp,
      value: language === 'ar' ? '+500,000' : '500K+',
      label: language === 'ar' ? 'محتوى مُنشأ' : 'Content Generated',
    },
    {
      icon: Award,
      value: '99%',
      label: language === 'ar' ? 'رضا العملاء' : 'Satisfaction Rate',
    },
  ];

  const testimonials = [
    {
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      role: language === 'ar' ? 'مدير تسويق' : 'Marketing Manager',
      content: language === 'ar'
        ? 'محتواي غيّر طريقة عملنا تماماً. نستطيع الآن إنتاج محتوى عالي الجودة بسرعة مذهلة!'
        : 'Mohtawi completely changed how we work. We can now produce high-quality content at amazing speed!',
      rating: 5,
    },
    {
      name: language === 'ar' ? 'فاطمة أحمد' : 'Fatima Ahmed',
      role: language === 'ar' ? 'صاحبة متجر إلكتروني' : 'E-commerce Owner',
      content: language === 'ar'
        ? 'أفضل أداة استخدمتها لكتابة أوصاف المنتجات. وفرت علي ساعات من العمل!'
        : 'Best tool I\'ve used for writing product descriptions. Saved me hours of work!',
      rating: 5,
    },
    {
      name: language === 'ar' ? 'خالد السعيد' : 'Khaled Al-Saeed',
      role: language === 'ar' ? 'مدون' : 'Blogger',
      content: language === 'ar'
        ? 'الذكاء الاصطناعي يكتب بشكل طبيعي جداً. أصبحت أنشر محتوى يومياً بفضل محتواي!'
        : 'The AI writes so naturally. I can now publish daily content thanks to Mohtawi!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-cyan-400">
                {t('brand.tagline')}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto animate-slide-up leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
              <button
                onClick={() => onNavigate('signup')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                {language === 'ar' ? 'جرّب مجانًا الآن' : 'Try Free Now'}
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
              <button
                onClick={() => {
                  const demoSection = document.getElementById('demo-section');
                  demoSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                {language === 'ar' ? 'شاهد كيف تعمل' : 'Watch Demo'}
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                {language === 'ar' ? 'تجربة مجانية' : 'Free Trial'}
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                {language === 'ar' ? 'لا تحتاج بطاقة بنكية' : 'No Credit Card Required'}
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                {language === 'ar' ? 'أكثر من 10,000 مستخدم' : '10,000+ Users'}
              </div>
            </div>
          </div>

          <div className="mt-20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            </div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 hover-lift">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-1 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {language === 'ar' ? 'محتوى - منصة الذكاء الاصطناعي' : 'Mohtawa - AI Platform'}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  <div className="flex-1 h-4 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded animate-pulse"></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-600 mt-2"></div>
                  <div className="flex-1 h-4 bg-gradient-to-r from-violet-200 to-violet-100 dark:from-violet-900 dark:to-violet-800 rounded w-5/6 animate-pulse delay-100"></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  <div className="flex-1 h-4 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded w-4/6 animate-pulse delay-200"></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-600 mt-2"></div>
                  <div className="flex-1 h-4 bg-gradient-to-r from-violet-200 to-violet-100 dark:from-violet-900 dark:to-violet-800 rounded w-3/6 animate-pulse delay-300"></div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm rounded-full animate-pulse">
                  {language === 'ar' ? 'جاري الكتابة بالذكاء الاصطناعي...' : 'AI Writing in Progress...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover-lift"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            {t('features.title')}
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'اكتشف مميزات منصتنا التي تجعل عملية إنشاء المحتوى سهلة وممتعة'
              : 'Discover our platform features that make content creation easy and enjoyable'}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover-lift"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {t(feature.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="demo-section" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {language === 'ar' ? 'شاهد محتوى في العمل' : 'See Mohtawa in Action'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'اكتشف كيف يمكن للذكاء الاصطناعي أن يساعدك في إنشاء محتوى احترافي في ثوانٍ'
                : 'Discover how AI can help you create professional content in seconds'}
            </p>
          </div>

          <div className="relative bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-1">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <Play className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'ar' ? 'فيديو توضيحي قريباً' : 'Demo Video Coming Soon'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {language === 'ar'
                  ? 'سنوفر قريباً فيديو توضيحي يشرح كيفية استخدام المنصة وإنشاء محتوى رائع'
                  : 'We will soon provide a demo video explaining how to use the platform and create amazing content'}
              </p>
              <button
                onClick={() => onNavigate('signup')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300"
              >
                {language === 'ar' ? 'ابدأ تجربتك المجانية' : 'Start Your Free Trial'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'انضم إلى آلاف المستخدمين الراضين عن خدماتنا'
                : 'Join thousands of satisfied users'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover-lift"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4 opacity-50" />
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === 'ar' ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'ابدأ الآن مجاناً ولا تحتاج إلى بطاقة بنكية. جرّب المنصة واكتشف قوة الذكاء الاصطناعي'
              : 'Start now for free, no credit card required. Try the platform and discover the power of AI'}
          </p>
          <button
            onClick={() => onNavigate('signup')}
            className="px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            {language === 'ar' ? 'ابدأ مجاناً الآن' : 'Start Free Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
