import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { blogAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

interface PostForm {
  title: string;
  content: string;
  excerpt: string;
  tags: string;
  status: 'draft' | 'published';
}

const PostEditor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PostForm>({
    defaultValues: {
      status: 'published'
    }
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchPost(id);
    }
  }, [id, isEditing]);

  const fetchPost = async (postId: string) => {
    try {
      const response = await blogAPI.getPosts('all', 1, 100);
      const post = response.posts.find((p: any) => p.id === postId);
      
      if (post) {
        setValue('title', post.title);
        setValue('content', post.content);
        setValue('excerpt', post.excerpt);
        setValue('tags', post.tags.join(', '));
        setValue('status', post.status);
        
        if (post.featured_image) {
          setExistingImage(post.featured_image);
        }
      }
    } catch (error) {
      toast.error('Failed to fetch post');
      navigate('/admin/dashboard');
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeaturedImage(e.target.value);
  };

  const removeImage = () => {
    setFeaturedImage('');
    setExistingImage(null);
  };

  const onSubmit = async (data: PostForm) => {
    if (!user) {
      toast.error('You must be logged in to create posts');
      return;
    }

    setIsLoading(true);
    try {
      const postData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        tags: data.tags,
        status: data.status,
        author: user.username,
        featuredImage: featuredImage || existingImage || undefined,
      };

      if (isEditing && id) {
        await blogAPI.updatePost(id, postData);
        toast.success('Post updated successfully!');
      } else {
        await blogAPI.createPost(postData);
        toast.success('Post created successfully!');
      }
      
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-navy-primary transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-semibold text-navy-primary">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>
            
            <div className="text-sm text-gray-600">
              Logged in as {user?.username}
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Excerpt */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                {...register('excerpt', { required: 'Excerpt is required' })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                placeholder="Brief description of the post"
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
              )}
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                placeholder="Write your post content here..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                {...register('tags')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                placeholder="immigration, canada, visa (comma separated)"
              />
            </div>

            {/* Featured Image URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              
              {(featuredImage || existingImage) && (
                <div className="mb-4 relative">
                  <img
                    src={featuredImage || existingImage || ''}
                    alt="Featured"
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              
              <input
                type="url"
                value={featuredImage}
                onChange={handleImageUrlChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-gray-500 text-sm mt-1">
                Enter a URL to an image (e.g., from Pexels, Unsplash, etc.)
              </p>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                {...register('status')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="bg-gold-primary text-navy-primary px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gold-secondary transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-navy-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  <span>{isEditing ? 'Update Post' : 'Create Post'}</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;