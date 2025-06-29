import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 클라이언트 컴포넌트용 Supabase 클라이언트
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers 클라이언트 (권장)
export const createSupabaseClient = () => createClientComponentClient()

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          name: string | null
          phone: string | null
          password: string | null
          avatar_url: string | null
          agree_marketing: boolean | null
          is_approved: boolean | null
          is_admin: boolean | null
          ai_generation_count: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          name?: string | null
          phone?: string | null
          password?: string | null
          avatar_url?: string | null
          agree_marketing?: boolean | null
          is_approved?: boolean | null
          is_admin?: boolean | null
          ai_generation_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          name?: string | null
          phone?: string | null
          password?: string | null
          avatar_url?: string | null
          agree_marketing?: boolean | null
          is_approved?: boolean | null
          is_admin?: boolean | null
          ai_generation_count?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
