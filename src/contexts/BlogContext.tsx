import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  date: string;
  approved: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
  featuredImage?: string;
  slug: string;
  status: 'draft' | 'published';
  views: number;
  likes: number;
  comments: Comment[];
}

interface BlogContextType {
  posts: BlogPost[];
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addPost: (post: Omit<BlogPost, 'id' | 'views' | 'likes' | 'comments'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'date' | 'approved'>) => void;
  approveComment: (postId: string, commentId: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
  likePost: (postId: string) => void;
  incrementViews: (postId: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'racimmigration2024'; // Change this to a secure password

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load posts from localStorage or use default data
  useEffect(() => {
    const savedPosts = localStorage.getItem('racBlogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Load initial data from JSON file
      import('../data/blogPosts.json').then((data) => {
        setPosts(data.default);
        localStorage.setItem('racBlogPosts', JSON.stringify(data.default));
      });
    }

    // Check if admin is logged in
    const adminStatus = localStorage.getItem('racAdminLoggedIn');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('racBlogPosts', JSON.stringify(posts));
    }
  }, [posts]);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('racAdminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('racAdminLoggedIn');
  };

  const addPost = (postData: Omit<BlogPost, 'id' | 'views' | 'likes' | 'comments'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      views: 0,
      likes: 0,
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const addComment = (postId: string, commentData: Omit<Comment, 'id' | 'date' | 'approved'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      approved: false
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  const approveComment = (postId: string, commentId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId ? { ...comment, approved: true } : comment
            )
          }
        : post
    ));
  };

  const deleteComment = (postId: string, commentId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: post.comments.filter(comment => comment.id !== commentId)
          }
        : post
    ));
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const incrementViews = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, views: post.views + 1 } : post
    ));
  };

  return (
    <BlogContext.Provider value={{
      posts,
      isAdmin,
      login,
      logout,
      addPost,
      updatePost,
      deletePost,
      addComment,
      approveComment,
      deleteComment,
      likePost,
      incrementViews
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};