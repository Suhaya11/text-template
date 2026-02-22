"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const sess = globalThis.localSession || null;
    const usrs = globalThis.localUsers || [];
    setSession(sess);
    setUsers(usrs);
    if (sess) {
      const u = usrs.find((u: any) => u.id === sess.id);
      setUser(u || null);
    }
  }, []);

  useEffect(() => {
    if (!session || !user) {
      window.location.href = "/login";
    }
  }, [session, user]);

  if (!session || !user) return null;

  const userData = {
    id: user.id,
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
