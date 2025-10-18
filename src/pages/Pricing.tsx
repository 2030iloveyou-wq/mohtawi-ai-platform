import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PricingProps {
  onNavigate: (page: string) => void;
}

export default function Pricing({ onNavigate }: PricingProps) {
  const { t, language } = useLanguage();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: t('pricing.free'),
      price: '0',
      features: [
        language === 'ar' ? '5,000 كلمة شهرياً' : '5,000 words/month',
        language === 'ar' ? 'وصول لجميع الأدوات' : 'Access to all tools',
        language === 'ar' ? 'دعم أساسي' : 'Basic support',
      ],
      popular: false,
    },
    {
      name: t('pricing.basic'),
      price: '29',
      features: [
        language === 'ar' ? '50,000 كلمة شهرياً' : '50,000 words/month',
        language === 'ar' ? 'وصول لجميع الأدوات' : 'Access to all tools',
        language === 'ar' ? 'دعم ذو أولوية' : 'Priority support',
        language === 'ar' ? 'حفظ التاريخ' : 'History saving',
      ],
      popular: false,
    },
    {
      name: t('pricing.pro'),
      price: '79',
      features: [
        language === 'ar' ? '200,000 كلمة شهرياً' : '200,000 words/month',
        language === 'ar' ? 'وصول لجميع الأدوات' : 'Access to all tools',
        language === 'ar' ? 'دعم متقدم' : 'Premium support',
        language === 'ar' ? 'حفظ التاريخ' : 'History saving',
        language === 'ar' ? 'API وصول' : 'API access',
      ],
      popular: true,
    },
    {
      name: t('pricing.enterprise'),
      price: language === 'ar' ? 'مخصص' : 'Custom',
      features: [
        language === 'ar' ? 'كلمات غير محدودة' : 'Unlimited words',
        language === 'ar' ? 'وصول لجميع الأدوات' : 'Access to all tools',
        language === 'ar' ? 'دعم مخصص 24/7' : '24/7 dedicated support',
        language === 'ar' ? 'حفظ التاريخ' : 'History saving',
        language === 'ar' ? 'API وصول' : 'API access',
        language === 'ar' ? 'نماذج مخصصة' : 'Custom models',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {language === 'ar' ? 'خطط مرنة تناسب احتياجاتك' : 'Flexible Plans for Your Needs'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {language === 'ar'
              ? 'ابدأ مجاناً، لا تحتاج بطاقة بنكية. قم بالترقية في أي وقت'
              : 'Start free, no credit card required. Upgrade anytime'}
          </p>
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {language === 'ar' ? 'شهري' : 'Monthly'}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                billingPeriod === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {language === 'ar' ? 'سنوي' : 'Yearly'}
              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                {language === 'ar' ? 'وفّر 20%' : 'Save 20%'}
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 bg-white dark:bg-gray-800 rounded-2xl border-2 transition-all duration-300 hover-lift ${
                plan.popular
                  ? 'border-blue-500 dark:border-blue-500 shadow-xl scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-full">
                  {t('pricing.popular')}
                </div>
              )}

              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {plan.name}
              </h3>

              <div className="mb-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  {plan.price === 'Custom' || plan.price === 'مخصص' ? plan.price : `$${plan.price}`}
                </span>
                {plan.price !== 'Custom' && plan.price !== 'مخصص' && (
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('pricing.month')}
                  </span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onNavigate('signup')}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t('pricing.select')}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {language === 'ar'
              ? 'جميع الخطط تشمل تجربة مجانية لمدة 7 أيام'
              : 'All plans include a 7-day free trial'}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              {language === 'ar' ? 'لا حاجة لبطاقة ائتمان' : 'No credit card required'}
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              {language === 'ar' ? 'إلغاء في أي وقت' : 'Cancel anytime'}
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              {language === 'ar' ? 'دعم فني 24/7' : '24/7 Support'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
