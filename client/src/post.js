// import{format} from "date-fns"
// export default function Post({title,summary,cover,content,createdAt,author}){
    
//     return(
//         <div className="post">
//         <div className="image">
//         <img src="https://tse4.mm.bing.net/th?id=OIP.te5-Jfhddh7mhV1AjTz-7AHaEo&pid=Api&P=0&h=220"></img></div>
//        <div className="texts">
//        <h2>{title}</h2>
//        <p className="info">
//         <a href="" className="author">{author.username}</a>
      
//         <time >{format(new Date(createdAt),'MMM  d,yyyy HH:mm')}
//         </time>
//        </p>
//        <p className="summary">{summary}</p> 
//      </div>
//     </div>
//     )
// }
// // formatISO9075
import { format } from "date-fns";
import {Link} from "react-router-dom"
export default function Post({_id, title, summary, cover, content, createdAt, author }) {
    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                <img src={'http://localhost:5001/'+cover}alt="Cover Image" />
                </Link>    
            </div>
            <div className="texts">
                <Link to={`post/${_id}`}>
                <h2>{title}</h2>
                </Link>
              
                <p className="info">
                    {author && <a href="" className="author">{author.username}</a>}
                    <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );}
// }
// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { Link } from "react-router-dom";

// export default function Post({_id, title, summary, cover, createdAt, author }) {
//   const [renderCount, setRenderCount] = useState(0);

//   // Increment render count on component mount (initial render)
//   useEffect(() => {
//     setRenderCount((prevCount) => prevCount + 1);
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   return (
//     <div className="post">
//       <div className="image">
//         <Link to={`/post/${_id}`}>
//           <img src={`http://localhost:5001/${cover}`} alt={title} />
//         </Link>
//       </div>
//       <div className="texts">
//         <Link to={`/post/${_id}`}>
//           <h2>{title}</h2>
//         </Link>
//         <p className="info">
//           {author ? (
//             <Link to={`/author/${author._id}`} className="author">
//               {author.username}
//             </Link>
//           ) : (
//             <span className="author">Unknown Author</span>
//           )}
//           <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
//         </p>
//         <p className="summary">{summary}</p>
//         <p>Render Count: {renderCount}</p>
//       </div>
//     </div>
//   );
// }
