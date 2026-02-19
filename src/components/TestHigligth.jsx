import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Test = () => {
   
 return (  <SyntaxHighlighter language="javascript" style={atomOneDark}>
    {`const hello = "world";`}
  </SyntaxHighlighter>
)};
 export default Test;