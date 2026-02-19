
import { BiCodeAlt} from "react-icons/bi";


import { FaStar, FaV } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";

import { MdHistory } from "react-icons/md";

function Nav() {
    return (<nav className='w-3/48 flex flex-row flex-wrap bg-gray-900 border-r border-gray-400 gap-8'>
<div className=" flex flex-row  my-0 mx-auto flex-wrap  flex flex-wrap flex-row gap-10">
      <i className='bg-green-600 w-fit my-0 mx-auto px-2 mt-6 rounded-lg h-fit '>
       <BiCodeAlt size={30}/>
  </i>
</div>
<div className="flex flex-row flex-wrap gap-18">
<div className=" flex flex-row flex-wrap mb-6 flex flex-wrap flex-row gap-10">
 <i title="Home" className=' w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    {/* <HiHomeModern/> */}
    {/* <HiHome/>
     */}
     <HiOutlineHome size={30} color="green"></HiOutlineHome>
  </i> <i  title="Favourites" className=' w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    <FaStar size={30}  fill="white"/>
    
  </i> <i title="History" className='bg-green-600 w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
<MdHistory size={30}/>
  </i>


</div>
<div className="w-fit mb-2 mt-2 mx-auto px-2  h-fit flex flex-row flex-wrap gap-8">
      <i title="React js" className='w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
      <BiCodeAlt size={30}/>
  </i>

      <i title="React TypeScript" className=' w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
   <BiCodeAlt size={30}/>
  </i>

      <i title="JavaScript" className=' w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
   <BiCodeAlt size={30}/>
  </i>

      <i title="HTML" className=' w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
   <BiCodeAlt size={30}/>
  </i>

      <i title="CSS" className=' w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    <BiCodeAlt size={30}/>
  </i>
</div>
</div>
</nav>  );
}

export default Nav;