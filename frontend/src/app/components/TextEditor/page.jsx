    "use client"
import React, { useRef, useState } from 'react';
import JoditEditor from "jodit-react";
import "jodit-react/examples/app.css"



const page = () => {
const editor = useRef(null);
const[content , setContent] = useState("");
const [config , setConfig] = useState({
    height:700,
    readOnly : false,
    placeholder:"write blog",

});

const handleTextEditorChange = (content) =>{
    setContent(content);
};



  return (
    <>
      <JoditEditor 
      className='text-dark'
      value={content}
      config={config}
      ref={editor}
      onChange={handleTextEditorChange}
      />
  <h3>output</h3>
<div dangerouslySetInnerHTML={{ __html:content}}></div>
    </>
  )
}

export default page
