import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  'brand.name': {
    ar: 'محتواي',
    en: 'Mohtawi'
  },
  'brand.tagline': {
    ar: 'ذكاء يصنع المحتوى العربي',
    en: 'Intelligence that creates Arabic content'
  },
  'hero.title': {
    ar: 'مرحبًا بك في محتواي',
    en: 'Welcome to Mohtawi'
  },
  'hero.subtitle': {
    ar: 'استكشف قوة الذكاء الاصطناعي في إنشاء المحتوى العربي — نصوص، صور، وفيديوهات في لحظات',
    en: 'Experience the power of AI in creating Arabic content — text, images, and videos in seconds'
  },
  'hero.description': {
    ar: 'محتواي منصة عربية مدعومة بالذكاء الاصطناعي لتوليد النصوص، الصور، والفيديوهات باحترافية عالية',
    en: 'Mohtawi is an Arabic AI-powered platform that generates high-quality text, images, and videos'
  },
  'cta.start': {
    ar: 'جرّب المنصة مجانًا',
    en: 'Try the platform for free'
  },
  'cta.demo': {
    ar: 'شاهد التجربة',
    en: 'Watch Demo'
  },
  'nav.home': {
    ar: 'الرئيسية',
    en: 'Home'
  },
  'nav.tools': {
    ar: 'الأدوات',
    en: 'Tools'
  },
  'nav.pricing': {
    ar: 'الأسعار',
    en: 'Pricing'
  },
  'nav.about': {
    ar: 'من نحن',
    en: 'About'
  },
  'nav.contact': {
    ar: 'اتصل بنا',
    en: 'Contact'
  },
  'nav.login': {
    ar: 'تسجيل الدخول',
    en: 'Login'
  },
  'nav.signup': {
    ar: 'إنشاء حساب',
    en: 'Sign Up'
  },
  'nav.dashboard': {
    ar: 'لوحة التحكم',
    en: 'Dashboard'
  },
  'features.title': {
    ar: 'لماذا محتواي؟',
    en: 'Why Mohtawi?'
  },
  'features.fast.title': {
    ar: 'سريع وذكي',
    en: 'Fast & Smart'
  },
  'features.fast.desc': {
    ar: 'احصل على محتوى عالي الجودة في ثوانٍ معدودة',
    en: 'Get high-quality content in just seconds'
  },
  'features.bilingual.title': {
    ar: 'دعم ثنائي اللغة',
    en: 'Bilingual Support'
  },
  'features.bilingual.desc': {
    ar: 'توليد المحتوى بالعربية والإنجليزية بسلاسة',
    en: 'Generate content seamlessly in Arabic and English'
  },
  'features.variety.title': {
    ar: 'أدوات متنوعة',
    en: 'Variety of Tools'
  },
  'features.variety.desc': {
    ar: 'مجموعة شاملة من الأدوات لكل احتياجاتك',
    en: 'Comprehensive suite of tools for all your needs'
  },
  'tools.title': {
    ar: 'أدوات الذكاء الاصطناعي',
    en: 'AI Tools'
  },
  'tools.blog.name': {
    ar: 'كاتب المدونات',
    en: 'Blog Writer'
  },
  'tools.blog.desc': {
    ar: 'اكتب مقالات مدونة كاملة بضغطة زر',
    en: 'Write complete blog articles with one click'
  },
  'tools.social.name': {
    ar: 'منشورات السوشيال ميديا',
    en: 'Social Media Posts'
  },
  'tools.social.desc': {
    ar: 'أنشئ تسميات توضيحية جذابة لمنصات التواصل',
    en: 'Create engaging captions for social platforms'
  },
  'tools.ads.name': {
    ar: 'نصوص إعلانية',
    en: 'Ad Copy'
  },
  'tools.ads.desc': {
    ar: 'صمم إعلانات مقنعة تحقق النتائج',
    en: 'Craft compelling ads that drive results'
  },
  'tools.product.name': {
    ar: 'أوصاف المنتجات',
    en: 'Product Descriptions'
  },
  'tools.product.desc': {
    ar: 'اكتب أوصاف منتجات احترافية',
    en: 'Write professional product descriptions'
  },
  'tools.email.name': {
    ar: 'رسائل البريد الإلكتروني',
    en: 'Email Marketing'
  },
  'tools.email.desc': {
    ar: 'أنشئ حملات بريد إلكتروني فعالة',
    en: 'Create effective email campaigns'
  },
  'tools.other.name': {
    ar: 'محتوى عام',
    en: 'General Content'
  },
  'tools.other.desc': {
    ar: 'أنشئ أي نوع من المحتوى الإبداعي',
    en: 'Generate any type of creative content'
  },
  'pricing.title': {
    ar: 'اختر الخطة المناسبة لك',
    en: 'Choose Your Perfect Plan'
  },
  'pricing.free': {
    ar: 'مجاني',
    en: 'Free'
  },
  'pricing.basic': {
    ar: 'أساسي',
    en: 'Basic'
  },
  'pricing.pro': {
    ar: 'احترافي',
    en: 'Pro'
  },
  'pricing.enterprise': {
    ar: 'مؤسسات',
    en: 'Enterprise'
  },
  'pricing.month': {
    ar: '/شهر',
    en: '/month'
  },
  'pricing.select': {
    ar: 'اختر الخطة',
    en: 'Select Plan'
  },
  'pricing.popular': {
    ar: 'الأكثر شعبية',
    en: 'Most Popular'
  },
  'login.title': {
    ar: 'تسجيل الدخول',
    en: 'Login'
  },
  'login.email': {
    ar: 'البريد الإلكتروني',
    en: 'Email'
  },
  'login.password': {
    ar: 'كلمة المرور',
    en: 'Password'
  },
  'login.button': {
    ar: 'دخول',
    en: 'Sign In'
  },
  'login.noAccount': {
    ar: 'ليس لديك حساب؟',
    en: "Don't have an account?"
  },
  'signup.title': {
    ar: 'إنشاء حساب جديد',
    en: 'Create New Account'
  },
  'signup.name': {
    ar: 'الاسم الكامل',
    en: 'Full Name'
  },
  'signup.button': {
    ar: 'إنشاء حساب',
    en: 'Sign Up'
  },
  'signup.hasAccount': {
    ar: 'لديك حساب بالفعل؟',
    en: 'Already have an account?'
  },
  'dashboard.title': {
    ar: 'لوحة التحكم',
    en: 'Dashboard'
  },
  'dashboard.generate': {
    ar: 'توليد المحتوى',
    en: 'Generate Content'
  },
  'dashboard.selectTool': {
    ar: 'اختر أداة',
    en: 'Select Tool'
  },
  'dashboard.describe': {
    ar: 'صف ما تريد كتابته...',
    en: 'Describe what you want to write...'
  },
  'dashboard.generating': {
    ar: 'جاري التوليد...',
    en: 'Generating...'
  },
  'dashboard.history': {
    ar: 'السجل',
    en: 'History'
  },
  'dashboard.usage': {
    ar: 'الاستخدام',
    en: 'Usage'
  },
  'dashboard.logout': {
    ar: 'تسجيل الخروج',
    en: 'Logout'
  },
  'about.title': {
    ar: 'من نحن',
    en: 'About Us'
  },
  'about.mission': {
    ar: 'محتواي منصة عربية رائدة في مجال الذكاء الاصطناعي، نهدف إلى تمكين المبدعين والشركات من إنتاج محتوى عربي عالي الجودة بسرعة وسهولة',
    en: 'Mohtawi is a leading Arabic AI platform, aiming to empower creators and businesses to produce high-quality Arabic content quickly and easily'
  },
  'footer.about': {
    ar: 'حول محتواي',
    en: 'About Mohtawi'
  },
  'footer.privacy': {
    ar: 'سياسة الخصوصية',
    en: 'Privacy Policy'
  },
  'footer.terms': {
    ar: 'شروط الاستخدام',
    en: 'Terms of Use'
  },
  'footer.contact': {
    ar: 'تواصل معنا',
    en: 'Contact Us'
  },
  'footer.copyright': {
    ar: '© 2025 محتواي — جميع الحقوق محفوظة',
    en: '© 2025 Mohtawi — All rights reserved'
  },
  'contact.title': {
    ar: 'اتصل بنا',
    en: 'Contact Us'
  },
  'contact.email': {
    ar: 'البريد الإلكتروني',
    en: 'Email'
  },
  'contact.message': {
    ar: 'رسالتك',
    en: 'Your Message'
  },
  'contact.send': {
    ar: 'إرسال',
    en: 'Send'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
