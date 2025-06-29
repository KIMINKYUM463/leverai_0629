-- image 버킷이 이미 존재하는지 확인
SELECT name FROM storage.buckets WHERE id = 'image';

-- 만약 image 버킷이 없다면 생성 (이미 있다면 이 명령은 무시됨)
INSERT INTO storage.buckets (id, name, public)
VALUES ('image', 'image', true)
ON CONFLICT (id) DO NOTHING;

-- image 버킷을 public으로 설정
UPDATE storage.buckets 
SET public = true 
WHERE id = 'image';

-- storage 정책 설정 (public read 허용)
CREATE POLICY IF NOT EXISTS "Public read access for images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'image');

-- storage 정책 설정 (public upload 허용 - 테스트용)
CREATE POLICY IF NOT EXISTS "Public upload access for images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'image');
