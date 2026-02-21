"use client";
import { data } from "./data";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { BiCopy, BiEdit, BiTrash, BiCodeAlt } from "react-icons/bi";
import { useState } from "react";

function SnippetCard({ snippet }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gray-800/50 border border-gray-700/50 hover:border-green-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/10 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Action Overlay */}
      <div className={`absolute top-3 right-3 z-10 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="flex gap-2 bg-gray-900/90 backdrop-blur-sm p-1.5 rounded-lg border border-gray-700 shadow-xl">
          <button title="Delete" className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all">
            <BiTrash size={18} />
          </button>
          <button title="Edit" className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-all">
            <BiEdit size={18} />
          </button>
          <button title="Copy" className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-md transition-all">
            <BiCopy size={18} />
          </button>
        </div>
      </div>

      {/* Card Header */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-700/50 bg-gray-800/30">
        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
           <BiCodeAlt size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate group-hover:text-green-500 transition-colors">
            {snippet?.title}
          </h3>
          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 group-hover:text-gray-400 transition-colors">
            {snippet?.lang}
          </span>
        </div>
      </div>

      {/* Code Preview */}
      <div className="relative flex-1 p-4 bg-gray-900/50">
        <div className="max-h-64 overflow-y-auto snippet-scroll rounded-xl border border-gray-800/50 group-hover:border-gray-700 transition-colors">
          <SyntaxHighlighter
            language={snippet?.lang}
            style={atomOneDark}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              background: 'transparent',
              padding: '1rem',
              fontSize: '13px',
              lineHeight: '1.5',
            }}
          >
            {snippet?.snippet}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Footer / Tags */}
      <div className="p-4 bg-gray-800/20 border-t border-gray-700/50 flex flex-wrap gap-2">
        {snippet?.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400 border border-gray-600/30 group-hover:bg-green-500/10 group-hover:text-green-500 group-hover:border-green-500/30 transition-all cursor-default"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ section }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 capitalize">
            {section} <span className="text-green-600">Snippets</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">Showing all {data?.length} results from your library.</p>
        </div>
        
        {/* Layout Filters (Optional) */}
        <div className="flex bg-gray-800/50 p-1 rounded-lg border border-gray-700">
           <div className="px-3 py-1 bg-green-600 text-xs font-bold text-white rounded-md cursor-pointer">Grid</div>
           <div className="px-3 py-1 text-xs font-bold text-gray-500 hover:text-gray-300 rounded-md cursor-pointer transition-colors">List</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((snippet) => (
          <SnippetCard key={snippet?.id} snippet={snippet} />
        ))}
      </div>
    </section>
  );
}

export default TemplateCard;
