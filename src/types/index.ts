export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: Category | string;
  imageUrl: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: string;
  email: string;
  article: Article | string;
  createdAt: string;
}

export interface CommentData {
  content: string;
  author: string;
  email: string;
}

export interface ErrorResponse {
  message: string;
}

export interface CreateArticleData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  imageUrl: string;
}