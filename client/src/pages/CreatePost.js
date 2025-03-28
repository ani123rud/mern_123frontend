// import { useState } from "react";
// import { Navigate } from "react-router-dom";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// export default function CreatePost(){
//     const [title,setTitle]=useState('');
//     const[summary,setSummary]=useState('');
//     const[content,setContent]=useState('');
//     const [files,setfiles]=useState('');
//     const [redirect,setRedirect]=useState(false);
//     const modules = {
//         toolbar: [
//           [{ header: [1, 2, false] }],
//           ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//           [
//             { list: 'ordered' },
//             { list: 'bullet' },
//             { indent: '-1' },
//             { indent: '+1' },
//           ],
//           ['link', 'image'],
//           ['clean'],
//         ],
//       };
//        async function createNewPost(ev){
//         const data=new FormData();
//         data.set('title',title);
//         data.set('summary',summary);
//         data.set('content',content);
//         data.set('file',files[0]);
//       ev.preventDefault();
//       const response= await fetch('http://localhost:5001/post',{
//         method:'POST',
//         body:data,
//         credentials:'include',
//       });
//       if(response.ok){
//        setRedirect(true);
//       }
//       }
//       if(redirect){
//         return <Navigate to={'/'}/>
//       }
//     return(
//       <form onSubmit={createNewPost}>
//         <input type="title" 
//         placeholder={"Title"}
//         value={title} 
//         onChange={ev=>setTitle(ev.target.value)}/>
//         <input type="summary"
//         value={summary}
//         onChange={ev=>setSummary(ev.target.value)}
//         placeholder={"Summary"}/>
//         <input type="file"
//         onChange={ev=>setfiles(ev.target.files)}/>
//         <ReactQuill 
//         value={content} 
//         onChange={newValue=>setContent(newValue)}
//         modules={modules} />
//         <button style={{marginTop:'5px'}}>Create post</button>
//       </form>  
//     )
// }
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null); // Use null or [] if dealing with multiple files
  const [submissionCount, setSubmissionCount] = useState(0);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"]
    ]
  };

  const createNewPost = async (ev) => {
    ev.preventDefault();

    // Validate required fields
    if (!title.trim() || !summary.trim() || !content.trim()) {
      alert("Please fill out all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    if (files) {
      formData.append("file", files[0]); // Assuming single file upload
    }

    try {
      const response = await fetch("http://localhost:5001/post", {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      if (response.ok) {
        // Clear form fields after successful submission
        setTitle('');
        setSummary('');
        setContent('');
        setFiles(null); // Reset file input
        setSubmissionCount((prevCount) => prevCount + 1); // Increment submission count
        alert("Post created successfully!");
      } else {
        alert("Failed to create post. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while creating the post.");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={createNewPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input
          type="file"
          onChange={(ev) => setFiles(ev.target.files)}
          accept=".jpg, .jpeg, .png, .pdf" // Example file types
        />
        <ReactQuill
          value={content}
          onChange={(value) => setContent(value)}
          modules={modules}
        />
        <button type="submit" style={{ marginTop: "5px" }}>
          Create post
        </button>
      </form>
      <p>Total submissions: {submissionCount}</p>
    </div>
  );
}
       
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

        
        
        
        
        
        
        
        
        
        
        
