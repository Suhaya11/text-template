"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiImageAdd } from 'react-icons/bi';

export default function CreatePost({ user }: { user: any }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    setLoading(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, image }),
      });

      if (res.ok) {
        setContent('');
        setImage('');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <form onSubmit={handlePost}>
        <div className="flex gap-4">
          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold overflow-hidden">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              user.name[0]
            )}
          </div>
          <textarea
            className="flex-1 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl p-3 text-sm focus:ring-1 focus:ring-green-500 outline-none resize-none min-h-[100px]"
            placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {image && (
          <div className="mt-4 relative">
            <img src={image} alt="Preview" className="rounded-xl max-h-60 w-full object-cover" />
            <button
              type="button"
              onClick={() => setImage('')}
              className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
            >
              &times;
            </button>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <button
            type="button"
            className="flex items-center gap-2 text-zinc-500 hover:text-green-600 transition-colors text-sm font-medium"
            onClick={() => {
              const url = prompt('Enter image URL:');
              if (url) setImage(url);
            }}
          >
            <BiImageAdd size={20} />
            Add Image
          </button>
          <button
            type="submit"
            disabled={loading || (!content.trim() && !image)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-full transition-colors disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
