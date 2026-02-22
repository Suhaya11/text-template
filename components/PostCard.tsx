"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BiHeart, BiSolidHeart, BiCommentDetail, BiShareAlt, BiDotsHorizontalRounded, BiTrash, BiFlag } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export default function PostCard({ post, currentUser }: { post: any; currentUser: any }) {
  const [likes, setLikes] = useState(post.likes || []);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isLiked = likes.includes(currentUser._id);

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/posts/${post._id}/like`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setLikes(data.likes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${post._id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commentText }),
      });
      if (res.ok) {
        setCommentText('');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/posts/${post._id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReport = async () => {
    const reason = prompt('Please specify the reason for reporting this post:');
    if (!reason) return;
    try {
      const res = await fetch(`/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportedPost: post._id, reason }),
      });
      if (res.ok) {
        alert('Thank you. The post has been reported.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href={`/profile/${post.author._id}`} className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold overflow-hidden">
              {post.author.profilePicture ? (
                <img src={post.author.profilePicture} alt={post.author.name} className="h-full w-full object-cover" />
              ) : (
                post.author.name[0]
              )}
            </Link>
            <div>
              <Link href={`/profile/${post.author._id}`} className="font-semibold text-zinc-900 dark:text-white hover:underline block">
                {post.author.name}
              </Link>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="relative group">
            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors">
              <BiDotsHorizontalRounded size={20} />
            </button>
            <div className="absolute top-10 right-0 w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg hidden group-hover:block z-10 py-2">
              {(currentUser._id === post.author._id || currentUser.role === 'admin') && (
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                >
                  <BiTrash /> Delete Post
                </button>
              )}
              <button
                onClick={handleReport}
                className="w-full px-4 py-2 text-left text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-2"
              >
                <BiFlag /> Report Post
              </button>
            </div>
          </div>
        </div>

        <p className="text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap mb-4 text-[15px]">
          {post.content}
        </p>

        {post.image && (
          <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 mb-4">
            <img src={post.image} alt="Post content" className="w-full h-auto max-h-[500px] object-cover" />
          </div>
        )}

        <div className="flex items-center gap-6 pt-2 border-t border-zinc-50 dark:border-zinc-800/50">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm transition-colors ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-red-500'}`}
          >
            {isLiked ? <BiSolidHeart size={20} /> : <BiHeart size={20} />}
            <span className="font-medium">{likes.length}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-green-600 transition-colors"
          >
            <BiCommentDetail size={20} />
            <span className="font-medium">{post.comments?.length || 0}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-blue-600 transition-colors">
            <BiShareAlt size={20} />
            <span className="font-medium">Repost</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 border-t border-zinc-100 dark:border-zinc-800">
          <form onSubmit={handleComment} className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-1.5 text-sm outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              disabled={loading || !commentText.trim()}
              className="text-green-600 font-semibold text-sm disabled:opacity-50"
            >
              Post
            </button>
          </form>

          <div className="space-y-4">
            {post.comments?.map((comment: any) => (
              <div key={comment._id} className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex-shrink-0 flex items-center justify-center font-bold text-xs">
                  {comment.author.name[0]}
                </div>
                <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none flex-1 border border-zinc-100 dark:border-zinc-800/50 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-zinc-900 dark:text-white">{comment.author.name}</span>
                    <span className="text-[10px] text-zinc-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
