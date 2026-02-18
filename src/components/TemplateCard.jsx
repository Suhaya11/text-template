import { log } from "console";
import { data } from "./data";
function TemplateCard() {




    return <div className="flex flex-row flex-wrap gap-2 my-2 mx-3 justify-center border-t">
{data?.map(snipppet => <div key={snipppet?.id} className="bg-gray-600 border border-gray-400 w-70 h-fit rounded-md ">
    <h3 className="p-2 text-center">{snipppet?.title}</h3>
<span>* {snipppet?.lang}</span>

    <div className="w-60 h-70  my-2 mx-auto overflow-y-scroll bg-black text-white p-3 rounded-2xl">
      {snipppet?.snippet}  
    </div>
<p className="flex flex-row flex-wrap w-60  gap-2 ml-4">{snipppet?.tags.map(tag=> <span key={tag} className="border border-gray-500 px-2 rounded-md">#{tag}</span>)}</p>
</div>)}

    </div>
}

export default TemplateCard;