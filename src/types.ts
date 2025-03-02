export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl?: string;
  category: Category;
}

export interface Comment {
  _id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface CommentData {
  author: string;
  content: string;
}

export interface CreateArticleData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  imageUrl?: string;
} 