-- Supabase Storage 버킷 생성 (Supabase 대시보드에서 실행)
-- 버킷명: templates
-- Public access: true (템플릿 파일들을 공개적으로 접근 가능하게)

-- RLS 정책 설정
INSERT INTO storage.buckets (id, name, public) VALUES ('templates', 'templates', true);

-- 모든 사용자가 템플릿 파일을 읽을 수 있도록 정책 설정
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'templates');
