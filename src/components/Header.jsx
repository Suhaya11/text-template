import { BiSearch, BiPlus } from "react-icons/bi";

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between gap-6 max-w-7xl mx-auto">
        {/* Search Bar */}
        <form className="flex-1 relative group max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-500 transition-colors">
            <BiSearch size={22} />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="block w-full pl-11 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none transition-all placeholder:text-gray-500 hover:bg-gray-800"
            placeholder="Search snippets (e.g., 'React Nav', 'Auth')..."
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-95">
            <BiPlus size={20} />
            <span>New Snippet</span>
          </button>
          
          {/* Profile/User (Optional placeholder) */}
          <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
            <span className="text-sm font-bold text-green-500">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
