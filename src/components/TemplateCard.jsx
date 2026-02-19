
import { data } from "./data";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Test from "./TestHigligth"
import { BiEdit, BiTrash } from "react-icons/bi";
function TemplateCard({section}) {




    return <div className="flex flex-row flex-wrap gap-2 my-2 mx-3 justify-center border-t"> 
    <div className="w-full">
        <h2>
          {section} snippets  
        </h2>
<p>{data?.length} Snippets found</p>
    </div>
{data?.map(snipppet => <div key={snipppet?.id} className="relative bg-gray-600 border border-gray-400 w-70 h-fit rounded-md "><Test/>
    <div className="postCardActions ">
<div className="flex  w-12/12 justify-end">
    <div className=" flex flex-row flex-wrap w-2/12 gap-8 mt-4 mr-2">
       <span title="Delete"><BiTrash/> </span>
<span title="Edit"><BiEdit/></span> 
    </div>


</div>

    </div>
    <h3 className="p-2 text-center">{snipppet?.title}</h3>
<span>* {snipppet?.lang}</span>

    <div className="w-60 h-70  my-2 mx-auto overflow-y-scroll bg-black  p-3 rounded-2xl">
     <SyntaxHighlighter language={snipppet?.lang}  style={atomOneDark}  showLineNumbers={true}
        wrapLines={true}>{snipppet?.snippet}  </SyntaxHighlighter> 
    </div>
<p className="flex flex-row flex-wrap w-60  gap-2 ml-4">{snipppet?.tags.map(tag=> <span key={tag} className="border border-gray-500 px-2 rounded-md">#{tag}</span>)}</p>
</div>)}

    </div>
}

export default TemplateCard;