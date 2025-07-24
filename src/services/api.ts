import { supabase } from '../lib/supabase';
import type { BlogPost } from '../lib/supabase';

// Helper function to generate slug
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      throw new Error('Failed to fetch user profile');
    }

    return {
      token: data.session.access_token,
      user: {
        id: data.user.id,
        username: profile.username,
        email: profile.email,
      },
    };
  },

  register: async (username: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          username,
          email,
          role: 'admin',
        });

      if (profileError) {
        throw new Error('Failed to create user profile');
      }
    }

    return { message: 'User created successfully' };
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  },
};

// Blog API
export const blogAPI = {
  getPosts: async (status = 'published', page = 1, limit = 10) => {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('publish_date', { ascending: false });

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: posts, error, count } = await query
      .range(from, to)
      .limit(limit);

    if (error) {
      throw new Error(error.message);
    }

    const totalPages = count ? Math.ceil(count / limit) : 1;

    return {
      posts: posts || [],
      pagination: {
        current: page,
        pages: totalPages,
        total: count || 0,
      },
    };
  },

  getPost: async (slug: string) => {
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return post;
  },

  createPost: async (postData: {
    title: string;
    content: string;
    excerpt: string;
    tags: string;
    status: string;
    author: string;
    featuredImage?: string;
  }) => {
    const slug = generateSlug(postData.title);
    const tags = postData.tags ? postData.tags.split(',').map(tag => tag.trim()) : [];

    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert({
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        author: postData.author,
        tags,
        status: postData.status as 'draft' | 'published',
        slug,
        featured_image: postData.featuredImage,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return post;
  },

  updatePost: async (id: string, postData: {
    title: string;
    content: string;
    excerpt: string;
    tags: string;
    status: string;
    featuredImage?: string;
  }) => {
    const slug = generateSlug(postData.title);
    const tags = postData.tags ? postData.tags.split(',').map(tag => tag.trim()) : [];

    const updateData: Partial<BlogPost> = {
      title: postData.title,
      content: postData.content,
      excerpt: postData.excerpt,
      tags,
      status: postData.status as 'draft' | 'published',
      slug,
    };

    if (postData.featuredImage) {
      updateData.featured_image = postData.featuredImage;
    }

    const { data: post, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return post;
  },

  deletePost: async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Post deleted successfully' };
  },
};

export default supabase;