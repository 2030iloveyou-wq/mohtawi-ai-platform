/*
  # إنشاء جدول الإبداعات (Creations)

  1. جدول جديد `creations`
    - `id` (uuid, primary key)
    - `user_id` (uuid, foreign key to auth.users)
    - `type` (text) - نوع الإبداع: 'image' أو 'video'
    - `prompt` (text) - الوصف المستخدم لتوليد المحتوى
    - `url` (text) - رابط الصورة أو الفيديو
    - `style` (text) - النمط المستخدم (واقعي، فني، كرتوني، إلخ)
    - `duration` (integer) - مدة الفيديو بالثواني (null للصور)
    - `status` (text) - حالة التوليد: 'processing', 'completed', 'failed'
    - `metadata` (jsonb) - بيانات إضافية
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  2. الأمان
    - تفعيل RLS على جدول `creations`
    - سياسات للقراءة والكتابة بناءً على user_id
*/

-- إنشاء جدول الإبداعات
CREATE TABLE IF NOT EXISTS creations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('image', 'video')),
  prompt text NOT NULL,
  url text,
  style text,
  duration integer,
  status text NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- إنشاء فهرس لتسريع الاستعلامات
CREATE INDEX IF NOT EXISTS idx_creations_user_id ON creations(user_id);
CREATE INDEX IF NOT EXISTS idx_creations_type ON creations(type);
CREATE INDEX IF NOT EXISTS idx_creations_status ON creations(status);
CREATE INDEX IF NOT EXISTS idx_creations_created_at ON creations(created_at DESC);

-- تفعيل Row Level Security
ALTER TABLE creations ENABLE ROW LEVEL SECURITY;

-- سياسة القراءة: المستخدم يمكنه قراءة إبداعاته فقط
CREATE POLICY "Users can view own creations"
  ON creations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- سياسة الإنشاء: المستخدم يمكنه إنشاء إبداعات جديدة
CREATE POLICY "Users can create own creations"
  ON creations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- سياسة التحديث: المستخدم يمكنه تحديث إبداعاته فقط
CREATE POLICY "Users can update own creations"
  ON creations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- سياسة الحذف: المستخدم يمكنه حذف إبداعاته فقط
CREATE POLICY "Users can delete own creations"
  ON creations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- إنشاء trigger لتحديث updated_at
CREATE TRIGGER update_creations_updated_at
  BEFORE UPDATE ON creations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();