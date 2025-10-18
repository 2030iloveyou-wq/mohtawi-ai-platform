import { useState } from 'react';
import { Video, Wand2, Download, Share2, Loader2, Sparkles, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth, supabase } from '../contexts/AuthContext';

const durations = [
  { value: 5, label: { ar: '5 ثوانٍ', en: '5 seconds' } },
  { value: 10, label: { ar: '10 ثوانٍ', en: '10 seconds' } },
  { value: 30, label: { ar: '30 ثانية', en: '30 seconds' } },
];

export default function VideoGenerator() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(5);
  const [loading, setLoading] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError(language === 'ar' ? 'الرجاء إدخال وصف للفيديو' : 'Please enter a video description');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedVideo(null);

    try {
      const { data: creation, error: dbError } = await supabase
        .from('creations')
        .insert({
          user_id: user?.id,
          type: 'video',
          prompt,
          duration,
          status: 'processing'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // محاكاة توليد الفيديو
      await new Promise(resolve => setTimeout(resolve, 5000));

      // فيديو تجريبي من Pexels
      const demoVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

      const { error: updateError } = await supabase
        .from('creations')
        .update({
          url: demoVideoUrl,
          status: 'completed'
        })
        .eq('id', creation.id);

      if (updateError) throw updateError;

      setGeneratedVideo(demoVideoUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to generate video');
      console.error('Error generating video:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedVideo) return;
    const a = document.createElement('a');
    a.href = generatedVideo;
    a.download = `mohtawa-video-${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    if (!generatedVideo) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'ar' ? 'فيديو من محتوى' : 'My Mohtawa Video',
          text: prompt,
          url: generatedVideo
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
            {language === 'ar' ? 'مولّد الفيديو بالذكاء الاصطناعي' : 'AI Video Generator'}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {language === 'ar' ? 'أنشئ فيديوهاتك بالذكاء الاصطناعي' : 'Create Videos with AI'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {language === 'ar'
            ? 'صف المشهد الذي تريده وسنحوله إلى فيديو احترافي'
            : 'Describe the scene you want and we\'ll turn it into a professional video'}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {language === 'ar' ? 'وصف الفيديو (Prompt)' : 'Video Description (Prompt)'}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white resize-none transition-all"
              placeholder={
                language === 'ar'
                  ? 'مثال: شخص يمشي في غابة خضراء مع أشعة الشمس تتسلل عبر الأشجار'
                  : 'Example: A person walking through a green forest with sunlight filtering through trees'
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {language === 'ar' ? 'مدة الفيديو' : 'Video Duration'}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {durations.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDuration(d.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover-lift ${
                    duration === d.value
                      ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="text-2xl mb-2">⏱️</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {d.label[language]}
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
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {language === 'ar' ? 'جاري التوليد...' : 'Generating...'}
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                {language === 'ar' ? 'توليد الفيديو' : 'Generate Video'}
              </>
            )}
          </button>
        </div>
      </div>

      {generatedVideo && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Video className="w-6 h-6" />
              {language === 'ar' ? 'الفيديو الناتج' : 'Generated Video'}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="p-3 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
                title={language === 'ar' ? 'تحميل' : 'Download'}
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
                title={language === 'ar' ? 'مشاركة' : 'Share'}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-gray-900">
            <video
              src={generatedVideo}
              controls
              className="w-full h-auto"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23111827' width='800' height='600'/%3E%3C/svg%3E"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">{language === 'ar' ? 'الوصف: ' : 'Prompt: '}</span>
              {prompt}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span className="font-semibold">{language === 'ar' ? 'المدة: ' : 'Duration: '}</span>
              {duration} {language === 'ar' ? 'ثانية' : 'seconds'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
