export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      formations: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      positions: {
        Row: {
          id: string
          name: string
          instrument_family: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          instrument_family?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          instrument_family?: string | null
          created_at?: string
        }
      }
      user_positions: {
        Row: {
          id: string
          user_id: string
          position_id: string
          formation_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          position_id: string
          formation_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          position_id?: string
          formation_id?: string
          created_at?: string
        }
      }
      rehearsals: {
        Row: {
          id: string
          formation_id: string
          title: string
          description: string | null
          rehearsal_date: string
          location: string | null
          notes: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          formation_id: string
          title: string
          description?: string | null
          rehearsal_date: string
          location?: string | null
          notes?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          formation_id?: string
          title?: string
          description?: string | null
          rehearsal_date?: string
          location?: string | null
          notes?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      rehearsal_absences: {
        Row: {
          id: string
          rehearsal_id: string
          user_id: string
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          rehearsal_id: string
          user_id: string
          reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          rehearsal_id?: string
          user_id?: string
          reason?: string | null
          created_at?: string
        }
      }
      sheet_music: {
        Row: {
          id: string
          title: string
          composer: string | null
          formation_id: string | null
          file_url: string
          thumbnail_url: string | null
          uploaded_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          composer?: string | null
          formation_id?: string | null
          file_url: string
          thumbnail_url?: string | null
          uploaded_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          composer?: string | null
          formation_id?: string | null
          file_url?: string
          thumbnail_url?: string | null
          uploaded_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          event_date: string
          event_type: 'rehearsal' | 'concert' | 'meeting' | 'social' | 'board'
          formation_id: string | null
          location: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          event_date: string
          event_type: 'rehearsal' | 'concert' | 'meeting' | 'social' | 'board'
          formation_id?: string | null
          location?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          event_date?: string
          event_type?: 'rehearsal' | 'concert' | 'meeting' | 'social' | 'board'
          formation_id?: string | null
          location?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'board' | 'member' | 'student'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'admin' | 'board' | 'member' | 'student'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'board' | 'member' | 'student'
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {
      event_type: 'rehearsal' | 'concert' | 'meeting' | 'social' | 'board'
      user_role: 'admin' | 'board' | 'member' | 'student'
    }
  }
}
