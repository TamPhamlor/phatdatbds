export interface Author {
  id: number;
  role_id: number;
  full_name: string;
  email: string;
  phone: string | null;
  is_verified: number;
  created_at: string;
  updated_at: string;
  avatar?: string;
}

export interface Tag {
  id: number;
  code: string;
  name: string;
  pivot: {
    post_id: number;
    tag_id: number;
  };
}

export interface PostType {
  id: number;
  code: string;
  name: string;
  pivot: {
    post_id: number;
    post_type_id: number;
  };
}

export interface Post {
  id: number;
  author_id: number;
  status: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  content_fmt: string;
  cover_image_url: string;
  reading_minutes: number;
  locale: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  canonical_url: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_card: string;
  robots_index: boolean;
  robots_follow: boolean;
  robots_advanced: string;
  schema_type: string;
  schema_json: string | null;
  hreflangs: string;
  breadcrumbs: string;
  author: Author;
  tags: Tag[];
  post_types: PostType[];
  category?: PostType;
}