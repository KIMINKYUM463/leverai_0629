-- 1. 관리자 여부를 반환하는 함수 생성 (RLS 우회)
CREATE OR REPLACE FUNCTION public.is_admin(p_uid uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER                   -- 작성자(서비스 롤) 권한으로 실행
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles        -- 이 쿼리는 함수 정의자의 권한으로 실행 → RLS 미적용
    WHERE id = p_uid
      AND is_admin = true
  );
END;
$$;

-- 함수가 다른 스키마 객체를 볼 수 있도록 search_path 지정
ALTER FUNCTION public.is_admin(uuid)
SET search_path = public, pg_catalog;

-- 2. 기존 재귀-유발 정책 제거
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- 3. RLS 정책을 함수 기반으로 재작성
--    (관리자이거나 본인인 경우 조회/수정 허용)

-- 조회
CREATE POLICY "Admins or owners can select"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id           -- 본인
  OR public.is_admin(auth.uid())   -- 관리자
);

-- 수정
CREATE POLICY "Admins or owners can update"
ON public.profiles
FOR UPDATE
USING (
  auth.uid() = id
  OR public.is_admin(auth.uid())
);
