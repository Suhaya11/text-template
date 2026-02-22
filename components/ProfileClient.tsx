"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PostCard from './PostCard';

export default function ProfileClient({ profile, currentUser, posts }: { profile: any; currentUser: any; posts: any[] }) {
  const [isFollowing, setIsFollowing] = useState(currentUser.following.includes(profile._id));
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isOwnProfile = currentUser._id === profile._id;

  const handleFollow = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${profile._id}/follow`, { method: 'POST' });
      if (res.ok) {
        setIsFollowing(!isFollowing);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async () => {
    const newName = prompt('Enter your name:', profile.name);
    const newPic = prompt('Enter profile picture URL:', profile.profilePicture);
    const newDept = prompt('Enter your department:', profile.department);
    const newClass = prompt('Enter your graduation class (e.g. Class of 2026):', profile.graduatingClass);

    if (newName) {
      try {
        const res = await fetch(`/api/users/${profile._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName, profilePicture: newPic, department: newDept, graduatingClass: newClass }),
        });
        if (res.ok) {
          router.refresh();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-green-600 to-green-400"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="h-32 w-32 rounded-full border-4 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-4xl font-bold text-zinc-400 overflow-hidden shadow-md">
              {profile.profilePicture ? (
                <img src={profile.profilePicture} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                profile.name[0]
              )}
            </div>
            
            <div className="flex gap-3">
              {isOwnProfile ? (
                <button 
                  onClick={handleEditProfile}
                  className="px-6 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold rounded-full transition-colors text-sm"
                >
                  Edit Profile
                </button>
              ) : (
                <button 
                  disabled={loading}
                  onClick={handleFollow}
                  className={`px-6 py-2 ${isFollowing ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'bg-green-600 text-white hover:bg-green-700'} font-semibold rounded-full transition-colors text-sm disabled:opacity-50`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{profile.name}</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{profile.ugNumber}</p>
          </div>

          <div className="mt-4 flex gap-6">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-zinc-900 dark:text-white">{profile.followers.length}</span>
              <span className="text-zinc-500 text-sm">Followers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-zinc-900 dark:text-white">{profile.following.length}</span>
              <span className="text-zinc-500 text-sm">Following</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Department</p>
                <p className="text-sm font-medium dark:text-zinc-200">{profile.department || 'Not specified'}</p>
             </div>
             <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Graduation</p>
                <p className="text-sm font-medium dark:text-zinc-200">{profile.graduatingClass || 'Not specified'}</p>
             </div>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white px-2">Posts</h2>
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} currentUser={currentUser} />
        ))}
        {posts.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400">No posts from this user yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
