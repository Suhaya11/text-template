import { BiCodeAlt, BiLogOut } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { MdHistory } from "react-icons/md";
import Link from "next/link";

function NavItem({ icon: Icon, title, href = "#", active = false }) {
  return (
    <Link
      href={href}
      title={title}
      className={`p-3 rounded-xl transition-all group flex items-center justify-center ${
        active
          ? "bg-green-600/20 text-green-500 shadow-inner"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      <Icon size={24} className={active ? "text-green-500" : "group-hover:scale-110 transition-transform"} />
    </Link>
  );
}

function Nav() {
  return (
    <nav className="w-20 min-h-screen flex flex-col bg-gray-900 border-r border-gray-800 py-6 items-center sticky top-0">
      {/* Logo */}
      <div className="bg-green-600 p-2.5 rounded-xl shadow-lg shadow-green-900/20 mb-10 cursor-pointer hover:bg-green-500 transition-colors">
        <BiCodeAlt size={28} className="text-white" />
      </div>

      {/* Main Nav */}
      <div className="flex flex-col gap-4 flex-1">
        <NavItem icon={HiOutlineHome} title="Home" href="/" active={true} />
        <NavItem icon={FaStar} title="Favourites" />
        <NavItem icon={MdHistory} title="History" />
        
        <div className="w-8 h-px bg-gray-800 my-2 self-center" />

        <NavItem icon={BiCodeAlt} title="React JS" />
        <NavItem icon={BiCodeAlt} title="TypeScript" />
        <NavItem icon={BiCodeAlt} title="JavaScript" />
        <NavItem icon={BiCodeAlt} title="HTML" />
        <NavItem icon={BiCodeAlt} title="CSS" />
      </div>

      {/* Footer Nav */}
      <div className="mt-auto">
        <NavItem icon={BiLogOut} title="Logout" href="/login" />
      </div>
    </nav>
  );
}

export default Nav;
