import { getSession } from '@/lib/auth';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import Post from '@/lib/models/Post';
import PostCard from '@/components/PostCard';
import ProfileClient from '@/components/ProfileClient';
import { notFound } from 'next/navigation';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return null;

  await connectDB();
  const profileUser = await User.findById(params.id).select('-password');
  if (!profileUser) notFound();

  const currentUser = await User.findById(session.id);
  const userPosts = await Post.find({ author: params.id })
    .populate('author', 'name profilePicture ugNumber')
    .sort({ createdAt: -1 });

  const plainProfile = JSON.parse(JSON.stringify(profileUser));
  const plainPosts = JSON.parse(JSON.stringify(userPosts));
  const plainCurrentUser = JSON.parse(JSON.stringify(currentUser));

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-8">
      <ProfileClient 
        profile={plainProfile} 
        currentUser={plainCurrentUser} 
        posts={plainPosts} 
      />
    </div>
  );
}
