import { useState } from 'react';
import { Image as ImageIcon, Wand2, Download, Share2, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth, supabase } from '../contexts/AuthContext';

const styles = [
  { id: 'realistic', label: { ar: 'واقعي', en: 'Realistic' }, icon: '📷' },
  { id: 'artistic', label: { ar: 'فني', en: 'Artistic' }, icon: '🎨' },
  { id: 'cartoon', label: { ar: 'كرتوني', en: 'Cartoon' }, icon: '🎭' },
  { id: '3d', label: { ar: 'ثلاثي الأبعاد', en: '3D' }, icon: '🎲' },
];

export default function ImageGenerator() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError(language === 'ar' ? 'الرجاء إدخال وصف للصورة' : 'Please enter an image description');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedImage(null);

    try {
      // حفظ الطلب في قاعدة البيانات
      const { data: creation, error: dbError } = await supabase
        .from('creations')
        .insert({
          user_id: user?.id,
          type: 'image',
          prompt,
          style: selectedStyle,
          status: 'processing'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // محاكاة توليد الصورة (في الواقع، هنا يتم الاتصال بـ API)
      // يمكن استخدام Replicate, Hugging Face, أو OpenAI DALL-E
      await new Promise(resolve => setTimeout(resolve, 3000));

      // صورة تجريبية من Unsplash بناءً على الكلمات المفتاحية
      const searchTerm = prompt.split(' ').slice(0, 3).join('+');
      const demoImageUrl = `https://source.unsplash.com/800x600/?${searchTerm},${selectedStyle}`;

      // تحديث قاعدة البيانات بالصورة الناتجة
      const { error: updateError } = await supabase
        .from('creations')
        .update({
          url: demoImageUrl,
          status: 'completed'
        })
        .eq('id', creation.id);

      if (updateError) throw updateError;

      setGeneratedImage(demoImageUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to generate image');
      console.error('Error generating image:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mohtawa-image-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading image:', err);
    }
  };

  const handleShare = async () => {
    if (!generatedImage) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'ar' ? 'صورتي من محتوى' : 'My Mohtawa Creation',
          text: prompt,
          url: generatedImage
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {language === 'ar' ? 'مولّد الصور بالذكاء الاصطناعي' : 'AI Image Generator'}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {language === 'ar' ? 'أنشئ صورك بالذكاء الاصطناعي' : 'Create Images with AI'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {language === 'ar'
            ? 'صف ما تريد وسنحوله إلى صورة مذهلة في ثوانٍ'
            : 'Describe what you want and we\'ll turn it into an amazing image in seconds'}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {language === 'ar' ? 'وصف الصورة (Prompt)' : 'Image Description (Prompt)'}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none transition-all"
              placeholder={
                language === 'ar'
                  ? 'مثال: منظر طبيعي لجبال مغطاة بالثلج عند غروب الشمس'
                  : 'Example: A scenic landscape of snow-covered mountains at sunset'
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {language === 'ar' ? 'النمط الفني' : 'Art Style'}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover-lift ${
                    selectedStyle === style.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="text-3xl mb-2">{style.icon}</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {style.label[language]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {language === 'ar' ? 'جاري التوليد...' : 'Generating...'}
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                {language === 'ar' ? 'توليد الصورة الآن' : 'Generate Image Now'}
              </>
            )}
          </button>
        </div>
      </div>

      {generatedImage && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-6 h-6" />
              {language === 'ar' ? 'الصورة الناتجة' : 'Generated Image'}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                title={language === 'ar' ? 'تحميل' : 'Download'}
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                title={language === 'ar' ? 'مشاركة' : 'Share'}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={generatedImage}
              alt={prompt}
              className="w-full h-auto object-contain"
              onError={() => setGeneratedImage(null)}
            />
          </div>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">{language === 'ar' ? 'الوصف: ' : 'Prompt: '}</span>
              {prompt}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span className="font-semibold">{language === 'ar' ? 'النمط: ' : 'Style: '}</span>
              {styles.find(s => s.id === selectedStyle)?.label[language]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
