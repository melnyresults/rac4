import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Heart, 
  MessageCircle, 
  LogOut,
  Calendar,
  Tag,
  Image,
  Save,
  X,
  Check
} from 'lucide-react';
import { useBlog, BlogPost } from '../contexts/BlogContext';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const { posts, logout, addPost, updatePost, deletePost, approveComment, deleteComment } = useBlog();
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Yuliya Balina',
    tags: '',
    featuredImage: '',
    status: 'published' as 'draft' | 'published'
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postForm.title.trim() || !postForm.content.trim() || !postForm.excerpt.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const postData = {
      ...postForm,
      tags: postForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      slug: generateSlug(postForm.title),
      publishDate: new Date().toISOString().split('T')[0]
    };

    if (editingPost) {
      updatePost(editingPost.id, postData);
      toast.success('Post updated successfully!');
      setEditingPost(null);
    } else {
      addPost(postData);
      toast.success('Post created successfully!');
    }

    setPostForm({
      title: '',
      excerpt: '',
      content: '',
      author: 'Yuliya Balina',
      tags: '',
      featuredImage: '',
      status: 'published'
    });
    setShowPostForm(false);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      tags: post.tags.join(', '),
      featuredImage: post.featuredImage || '',
      status: post.status
    });
    setShowPostForm(true);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
      toast.success('Post deleted successfully!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const allComments = posts.flatMap(post => 
    post.comments.map(comment => ({
      ...comment,
      postTitle: post.title,
      postId: post.id
    }))
  );

  const pendingComments = allComments.filter(comment => !comment.approved);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gold-primary rounded-full flex items-center justify-center">
                <span className="text-navy-primary font-bold text-sm">RAC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Blog Admin</h1>
                <p className="text-sm text-white/80">RAC Immigration</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'posts'
                  ? 'border-gold-primary text-gold-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Posts ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${
                activeTab === 'comments'
                  ? 'border-gold-primary text-gold-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Comments ({allComments.length})
              {pendingComments.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingComments.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'posts' && (
          <div>
            {/* Posts Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
              <button
                onClick={() => {
                  setShowPostForm(true);
                  setEditingPost(null);
                  setPostForm({
                    title: '',
                    excerpt: '',
                    content: '',
                    author: 'Yuliya Balina',
                    tags: '',
                    featuredImage: '',
                    status: 'published'
                  });
                }}
                className="bg-gold-primary text-navy-primary px-4 py-2 rounded-lg font-medium hover:bg-gold-secondary transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Post</span>
              </button>
            </div>

            {/* Posts List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stats
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(post.publishDate)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments.length}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="text-gold-primary hover:text-gold-secondary"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Comments Management</h2>
            
            {allComments.length > 0 ? (
              <div className="space-y-4">
                {allComments.map((comment) => (
                  <div key={`${comment.postId}-${comment.id}`} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="font-medium text-gray-900">{comment.author}</div>
                          <div className="text-sm text-gray-500">{comment.email}</div>
                          <div className="text-sm text-gray-500">{formatDate(comment.date)}</div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            comment.approved
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {comment.approved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          On: <span className="font-medium">{comment.postTitle}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!comment.approved && (
                          <button
                            onClick={() => approveComment(comment.postId, comment.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Approve comment"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this comment?')) {
                              deleteComment(comment.postId, comment.id);
                              toast.success('Comment deleted successfully!');
                            }
                          }}
                          className="text-red-600 hover:text-red-800"
                          title="Delete comment"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                <p className="text-gray-500">Comments will appear here when visitors leave them on your blog posts.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h3>
                <button
                  onClick={() => {
                    setShowPostForm(false);
                    setEditingPost(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={postForm.title}
                      onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-primary focus:border-gold-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={postForm.author}
                      onChange={(e) => setPostForm(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={postForm.excerpt}
                    onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={postForm.content}
                    onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={postForm.tags}
                      onChange={(e) => setPostForm(prev => ({ ...prev, tags: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-primary focus:border-gold-primary"
                      placeholder="Immigration, Express Entry, PNP"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={postForm.status}
                      onChange={(e) => setPostForm(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={postForm.featuredImage}
                    onChange={(e) => setPostForm(prev => ({ ...prev, featuredImage: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gold-primary focus:border-gold-primary"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPostForm(false);
                      setEditingPost(null);
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gold-primary text-navy-primary px-6 py-2 rounded-md font-medium hover:bg-gold-secondary transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingPost ? 'Update Post' : 'Create Post'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;