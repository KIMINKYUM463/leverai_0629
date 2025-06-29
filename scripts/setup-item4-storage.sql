-- item4 폴더용 대극천 복숭아 이미지 저장소 설정

-- 이미지 버킷이 없다면 생성 (이미 있다면 무시됨)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- item4 폴더 접근 정책 설정
INSERT INTO storage.objects (bucket_id, name, owner, metadata)
VALUES ('images', 'item4/', null, '{"folder": true}')
ON CONFLICT (bucket_id, name) DO NOTHING;

-- 공개 읽기 정책 (이미 있다면 무시됨)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public read access for images'
    ) THEN
        CREATE POLICY "Public read access for images"
        ON storage.objects FOR SELECT
        USING (bucket_id = 'images');
    END IF;
END $$;

-- 인증된 사용자 업로드 정책 (이미 있다면 무시됨)  
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Authenticated users can upload images'
    ) THEN
        CREATE POLICY "Authenticated users can upload images"
        ON storage.objects FOR INSERT
        WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
    END IF;
END $$;

-- RLS 활성화 (이미 활성화되어 있다면 무시됨)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 성공 메시지
SELECT 'item4 폴더 저장소 설정이 완료되었습니다. 이제 Supabase 대시보드에서 images/item4/ 폴더에 대극천 복숭아 이미지들을 업로드하세요.' as message;
