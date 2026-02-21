import TemplateCard from '@/src/components/TemplateCard';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome back to your snippet collection.</p>
      </div>
      
      <div className="mt-8">
        <TemplateCard section={'All'} />
      </div>
    </div>
  );
}
