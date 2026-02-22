import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full pt-16">
        <div className="max-w-2xl mx-auto">
          {/* Feed content will be rendered here */}
        </div>
      </div>
    </div>
  );
}
