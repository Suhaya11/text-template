import { log } from "console";
import { data } from "./data";
function TemplateCard() {




    return <div className="flex flex-row flex-wrap">
{data.map(snipppet => <div key={snipppet.id} className="bg-gray-600 border border-gray-400 w-30 h-50 ">
    <div className="w-20 h-30  my-2 mx-auto overflow-x-scroll">
      {snipppet.snippet}  
    </div>

</div>)}

    </div>
}

export default TemplateCard;