import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./pages/UserContext";

export default function Header(){
  const {setUserInfo,userInfo}=useContext(UserContext);
  useEffect(()=>{
    fetch('http://localhost:5001/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
      setUserInfo(userInfo);
      });
    });
  },[]);
//   useEffect(() => {
//     fetch('http://localhost:5001/profile', {
//         credentials: 'include',
//     })
//     .then(response => {
//         // Check if the response is ok
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(userInfo => {
//         // Set user info after successful response
//         setUserInfo(userInfo);
//     })
//     .catch(error => {
//         // Handle errors
//         console.error('Error fetching user profile:', error.message);
//         // Optionally, you can set a default user info or display an error message
//     });
// }, []);

  function logout(){
    fetch('http://localhost:5001/logout',{
      credentials:'include',
      method:'POST',
    });
    setUserInfo(null);
  }
  const username=userInfo?.username;
     return(
        <header>
          <p></p>
        <Link to="/" classname="logo">Myblog</Link>
        <nav>
          {username &&(
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logout}>Logout</a>
              </>
               )}
          {!username&&(<>
            <Link to="/login">login</Link>
             <Link to="/register">Register</Link> 
          </>
           
          )}
         
        </nav>
      </header>
     );
}