export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      auctions: {
        Row: {
          address: string[]
          auction_id: string
          created_at: string
          current_point: number
          description: string
          end_time: string
          favorites: string[] | null
          image_urls: string[] | null
          max_point: number
          seller_id: string
          start_time: string
          starting_point: number
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          address: string[]
          auction_id?: string
          created_at?: string
          current_point: number
          description: string
          end_time: string
          favorites?: string[] | null
          image_urls?: string[] | null
          max_point: number
          seller_id: string
          start_time: string
          starting_point: number
          status: string
          title: string
          updated_at?: string | null
        }
        Update: {
          address?: string[]
          auction_id?: string
          created_at?: string
          current_point?: number
          description?: string
          end_time?: string
          favorites?: string[] | null
          image_urls?: string[] | null
          max_point?: number
          seller_id?: string
          start_time?: string
          starting_point?: number
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auctions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["seller_id"]
          },
        ]
      }
      buyers: {
        Row: {
          avatar: string | null
          buyer_id: string
          created_at: string
          email: string
          favorites: string[] | null
          nickname: string | null
          password: string
          point: number
          social_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          buyer_id?: string
          created_at?: string
          email?: string
          favorites?: string[] | null
          nickname?: string | null
          password?: string
          point?: number
          social_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          buyer_id?: string
          created_at?: string
          email?: string
          favorites?: string[] | null
          nickname?: string | null
          password?: string
          point?: number
          social_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      episodes: {
        Row: {
          auction_id: string
          bid_point: number
          bid_time: string
          buyer_id: string
          created_at: string
          description: string
          episode_id: string
          likes: string[] | null
          title: string
          updated_at: string | null
          winning_bid: boolean
        }
        Insert: {
          auction_id: string
          bid_point?: number
          bid_time?: string
          buyer_id: string
          created_at?: string
          description?: string
          episode_id?: string
          likes?: string[] | null
          title?: string
          updated_at?: string | null
          winning_bid?: boolean
        }
        Update: {
          auction_id?: string
          bid_point?: number
          bid_time?: string
          buyer_id?: string
          created_at?: string
          description?: string
          episode_id?: string
          likes?: string[] | null
          title?: string
          updated_at?: string | null
          winning_bid?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "episodes_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["buyer_id"]
          },
          {
            foreignKeyName: "fk_episodes_auction"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["auction_id"]
          },
        ]
      }
      sellers: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          favorites: string[] | null
          nickname: string | null
          password: string
          point: number
          seller_id: string
          social_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email?: string
          favorites?: string[] | null
          nickname?: string | null
          password?: string
          point?: number
          seller_id?: string
          social_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          favorites?: string[] | null
          nickname?: string | null
          password?: string
          point?: number
          seller_id?: string
          social_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          favorites: string[] | null
          nickname: string
          password: string
          point: number
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email: string
          favorites?: string[] | null
          nickname: string
          password: string
          point?: number
          role: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          favorites?: string[] | null
          nickname?: string
          password?: string
          point?: number
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
