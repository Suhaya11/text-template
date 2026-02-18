function Nav() {
    return (<nav className='w-3/48 flex flex-row flex-wrap bg-gray-900 border-r border-gray-400 gap-8'>
<div className="w-fit my-2 mx-auto px-2 border border-white h-fit">
      <i className='bg-green-600 w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    {'</>'}
  </i>
</div>
<div className="flex flex-row flex-wrap gap-18">
<div className="border border-white flex flex-row flex-wrap mb-6 flex flex-wrap flex-row gap-10">
 <i title="Home" className='bg-green-600 w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    {'</>'}
  </i> <i  title="Favourites" className='bg-green-600 w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    {'</>'}
  </i> <i title="History" className='bg-green-600 w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    {'</>'}
  </i>


</div>
<div className="w-fit mb-2 mt-2 mx-auto px-2 border border-white h-fit flex flex-row flex-wrap gap-8">
      <i title="React js" className='bg-green-600 w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    {'</>'}
  </i>

      <i title="React TypeScript" className='bg-green-600 w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    {'</>'}
  </i>

      <i title="JavaScript" className='bg-green-600 w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    {'</>'}
  </i>

      <i title="HTML" className='bg-green-600 w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    {'</>'}
  </i>

      <i title="CSS" className='bg-green-600 w-fit my-0 mx-auto px-2 rounded-lg h-fit '>
    {'</>'}
  </i>
</div>
</div>
</nav>  );
}

export default Nav;