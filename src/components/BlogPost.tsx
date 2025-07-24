import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Eye, Heart, MessageCircle, User, Mail, Send } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import toast from 'react-hot-toast';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { posts, incrementViews, likePost, addComment } = useBlog();
  const [hasLiked, setHasLiked] = useState(false);
  const [commentForm, setCommentForm] = useState({
    author: '',
    email: '',
    content: ''
  });

  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      // Increment views when post is loaded
      incrementViews(post.id);
      
      // Check if user has already liked this post
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      setHasLiked(likedPosts.includes(post.id));
    }
  }, [post, incrementViews]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <button
            onClick={() => navigate('/blog')}
            className="text-gold-primary hover:text-navy-primary transition-colors"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    if (!hasLiked) {
      likePost(post.id);
      setHasLiked(true);
      
      // Store in localStorage to prevent multiple likes
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      likedPosts.push(post.id);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      
      toast.success('Thanks for liking this post!');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentForm.author.trim() || !commentForm.email.trim() || !commentForm.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    addComment(post.id, {
      author: commentForm.author.trim(),
      email: commentForm.email.trim(),
      content: commentForm.content.trim()
    });

    setCommentForm({ author: '', email: '', content: '' });
    toast.success('Comment submitted! It will appear after approval.');
  };

  const approvedComments = post.comments.filter(comment => comment.approved);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-navy-primary text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-gold-primary hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Article */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {post.featuredImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          )}

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-primary mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Eye className="w-5 h-5" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-5 h-5" />
                  <span>{approvedComments.length}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gold-primary/10 text-gold-primary text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none mb-12"
          >
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Like Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <button
              onClick={handleLike}
              disabled={hasLiked}
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                hasLiked
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-gold-primary text-navy-primary hover:bg-gold-secondary shadow-lg hover:shadow-xl'
              }`}
            >
              <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
              <span>{hasLiked ? 'Liked!' : 'Like this post'}</span>
            </button>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-gray-200 pt-12"
          >
            <h3 className="text-2xl font-bold text-navy-primary mb-8">
              Comments ({approvedComments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-navy-primary mb-4">Leave a Comment</h4>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={commentForm.author}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment *
                </label>
                <textarea
                  value={commentForm.content}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                  placeholder="Share your thoughts..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="inline-flex items-center space-x-2 bg-navy-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-secondary transition-colors duration-300"
              >
                <Send className="w-5 h-5" />
                <span>Submit Comment</span>
              </button>
              
              <p className="text-sm text-gray-500 mt-2">
                Your comment will be reviewed before being published.
              </p>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {approvedComments.length > 0 ? (
                approvedComments.map((comment) => (
                  <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gold-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gold-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-navy-primary">{comment.author}</div>
                          <div className="text-sm text-gray-500">{formatDate(comment.date)}</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;