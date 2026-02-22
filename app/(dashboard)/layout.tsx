import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  await connectDB();
  const user = await User.findById(session.id).select('-password');

  if (!user) {
    redirect('/login');
  }

  const userData = {
    id: user._id.toString(),
    name: user.name,
    ugNumber: user.ugNumber,
    role: user.role,
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar user={userData} />
      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
