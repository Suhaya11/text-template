import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Report from '@/lib/models/Report';
import User from '@/lib/models/User';
import Post from '@/lib/models/Post';
import Config from '@/lib/models/Config';
import AdminClient from '@/components/AdminClient';

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    redirect('/');
  }

  await connectDB();
  const reports = await Report.find({ status: 'pending' })
    .populate('reporter', 'name ugNumber')
    .populate('reportedUser', 'name ugNumber')
    .populate('reportedPost')
    .sort({ createdAt: -1 });

  const totalUsers = await User.countDocuments();
  const totalPosts = await Post.countDocuments();
  
  let config = await Config.findOne();
  if (!config) {
    config = await Config.create({});
  }

  const plainReports = JSON.parse(JSON.stringify(reports));
  const plainConfig = JSON.parse(JSON.stringify(config));

  return (
    <div className="py-8 space-y-8">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Total Users</p>
          <p className="text-3xl font-bold dark:text-white">{totalUsers}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Total Posts</p>
          <p className="text-3xl font-bold dark:text-white">{totalPosts}</p>
        </div>
      </div>

      <AdminClient reports={plainReports} config={plainConfig} />
    </div>
  );
}
