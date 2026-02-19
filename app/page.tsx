import Main from '@/src/components/Main';
import Nav from '@/src/components/Nav'
import TemplateCard from '@/src/components/TemplateCard';
export default function Home() {
  return (
    <div className='flex'>
{/* <Nav/> */}
<div className='w-45/48'>
   {/* <Main/> */}
   <TemplateCard section={'home'}/>
   </div>
   </div>
  );
}
