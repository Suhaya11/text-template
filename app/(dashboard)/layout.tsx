import Nav from "@/src/components/Nav";
import Header from "@/src/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Nav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900/50">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
