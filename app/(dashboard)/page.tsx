import { getSession } from '@/lib/auth';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import Post from '@/lib/models/Post';
import PostCard from '@/components/PostCard';
import CreatePost from '@/components/CreatePost';

export default async function FeedPage() {
  const session = await getSession();
  if (!session) return null;

  await connectDB();
  const currentUser = await User.findById(session.id);
  
  // Fetch posts (public or from class members if implemented)
  const posts = await Post.find({})
    .populate('author', 'name profilePicture ugNumber')
    .sort({ createdAt: -1 })
    .limit(20);

  const plainPosts = JSON.parse(JSON.stringify(posts));
  const plainUser = JSON.parse(JSON.stringify(currentUser));

  return (
    <div className="py-8 max-w-2xl mx-auto space-y-6">
      <CreatePost user={plainUser} />
      <div className="space-y-4">
        {plainPosts.map((post: any) => (
          <PostCard key={post._id} post={post} currentUser={plainUser} />
        ))}
        {plainPosts.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400">No posts yet. Be the first to share something!</p>
          </div>
        )}
      </div>
    </div>
  );
}
