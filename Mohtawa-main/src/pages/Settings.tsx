import { useState, useEffect } from 'react';
import { User, Mail, Image, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth, supabase } from '../contexts/AuthContext';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

export default function Settings({ onNavigate }: SettingsProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.name || user.user_metadata?.full_name || '');
      setEmail(user.email || '');
      setAvatarUrl(user.user_metadata?.avatar_url || user.user_metadata?.picture || '');
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { name, avatar_url: avatarUrl }
      });

      if (error) throw error;

      setMessage({
        type: 'success',
        text: language === 'ar' ? 'تم حفظ التغييرات بنجاح' : 'Changes saved successfully'
      });
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Failed to save changes'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    onNavigate('login');
    return null;
  }

  const getUserInitial = () => {
    return name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
          >
            ← {language === 'ar' ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'إعدادات الملف الشخصي' : 'Profile Settings'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar'
                ? 'قم بتحديث معلومات حسابك وصورتك الشخصية'
                : 'Update your account information and profile picture'}
            </p>
          </div>

          <div className="flex justify-center mb-8">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name || 'User'}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-gray-200 dark:border-gray-700">
                {getUserInitial()}
              </div>
            )}
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                message.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm ${
                  message.type === 'success'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {message.text}
              </p>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all"
                  placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {language === 'ar'
                  ? 'لا يمكن تغيير البريد الإلكتروني'
                  : 'Email cannot be changed'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'رابط الصورة الشخصية' : 'Avatar URL'}
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white transition-all"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {language === 'ar'
                  ? 'أدخل رابط صورتك الشخصية (اختياري)'
                  : 'Enter your profile picture URL (optional)'}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {loading
                  ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...')
                  : (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes')}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                {language === 'ar' ? 'معلومات الحساب' : 'Account Information'}
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-medium">
                    {language === 'ar' ? 'طريقة التسجيل: ' : 'Sign-in method: '}
                  </span>
                  {user.app_metadata?.provider === 'email'
                    ? (language === 'ar' ? 'البريد الإلكتروني' : 'Email')
                    : user.app_metadata?.provider?.charAt(0).toUpperCase() + user.app_metadata?.provider?.slice(1)}
                </p>
                <p>
                  <span className="font-medium">
                    {language === 'ar' ? 'تاريخ الإنشاء: ' : 'Created: '}
                  </span>
                  {new Date(user.created_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
