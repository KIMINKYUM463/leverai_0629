-- image 버킷이 없다면 생성
INSERT INTO storage.buckets (id, name, public)
VALUES ('image', 'image', true)
ON CONFLICT (id) DO NOTHING;

-- image 버킷에 대한 정책 설정 (public read 허용)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'image');
