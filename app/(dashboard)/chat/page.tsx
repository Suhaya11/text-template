import { getSession } from '@/lib/auth';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import Message from '@/lib/models/Message';
import ChatClient from '@/components/ChatClient';

export default async function ChatPage() {
  const session = await getSession();
  if (!session) return null;

  await connectDB();
  const currentUser = await User.findById(session.id);
  
  // Fetch all users for now (can be optimized to only show friends/following)
  const users = await User.find({ _id: { $ne: session.id } }).select('name profilePicture ugNumber');

  const plainUsers = JSON.parse(JSON.stringify(users));
  const plainCurrentUser = JSON.parse(JSON.stringify(currentUser));

  return (
    <div className="py-8 h-[calc(100vh-64px)]">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden h-full flex">
        <ChatClient users={plainUsers} currentUser={plainCurrentUser} />
      </div>
    </div>
  );
}
