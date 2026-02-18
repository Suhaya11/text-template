function Header() {
    return (<>
    <header className="flex justify-end "  >
    <div className="flex w-full gap-2 self-right mr-2 mt-4">

<form action="" className="w-10/12 border-2 flex ">
<i className="p-2 text-gray-400 bg-gray-800  text-white">Search</i>
<input type="search" name="search" id="search" className="w-full bg-gray-800 p-2 text-white" placeholder="search snippest"/>

</form>
<div className="w-2/12">
    <button className="border border-grey-500 p-2 rounded-lg bg-green-700 w-full">+&nbsp;  New snippet</button>
</div>
    </div>

    </header>
    
    </>  );
}

export default Header;