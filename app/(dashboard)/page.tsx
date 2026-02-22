"use client";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";

export default function FeedPage() {
  const [session, setSession] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const sess = globalThis.localSession || null;
    const usrs = globalThis.localUsers || [];
    const psts = globalThis.localPosts || [];
    setSession(sess);
    setUsers(usrs);
    setPosts(psts);
    if (sess) {
      const user = usrs.find((u: any) => u.id === sess.id);
      setCurrentUser(user || null);
    }
  }, []);

  useEffect(() => {
    if (!session || !currentUser) {
      window.location.href = "/login";
    }
  }, [session, currentUser]);

  if (!session || !currentUser) return null;

  const postsWithAuthors = posts.map((post: any) => {
    const author = users.find((u: any) => u.id === post.author);
    return { ...post, author };
  });

  return (
    <div className="py-8 max-w-2xl mx-auto space-y-6">
      <CreatePost user={currentUser} />
      <div className="space-y-4">
        {postsWithAuthors.map((post: any) => (
          <PostCard key={post.id} post={post} currentUser={currentUser} />
        ))}
        {postsWithAuthors.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400">
              No posts yet. Be the first to share something!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
