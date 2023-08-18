// import React, { useContext, useEffect, useState } from 'react'
// import jwt_decode from "jwt-decode"
// import { AppContext } from '../../context/context';
// import { TOKEN_KEY } from '../../services/apiService';


// const GoogleRegister = () => {

//     const {userLoginGoogle,setUserLoginGoogle } = useContext(AppContext);

//     const handleCallbackResponse = (response) => {
//         const userObject = jwt_decode(response.credential);
//         // if(response.credential){
//         //     localStorage.setItem(TOKEN_KEY,userObject)
//         // }
//         setUserLoginGoogle(userObject);
//         document.getElementById("signInDiv").hidden = true;
//     }

//     const handleSignOut = (event) => {
//         localStorage.removeItem(TOKEN_KEY)
//         setUserLoginGoogle({});
//         document.getElementById("signInDiv").hidden = false;
//     }

//     useEffect(() => {
//         /*global google*/
//         google.accounts.id.initialize({
//             client_id: import.meta.env.VITE_CLIENT_ID,
//             callback: handleCallbackResponse
//         });
//         google.accounts.id.renderButton(
//             document.getElementById("signInDiv"),
//             { theme: "outline", size: "medium" }
//         )
//         google.accounts.id.prompt();
//     }, [])

//     return (
//         <div>
//             <div id='signInDiv'></div>
          
//             {userLoginGoogle &&
//                 <div>
//                     <img src={userLoginGoogle.picture} alt="user img" />
//                     <h3>{userLoginGoogle.name}</h3>
//                 </div>
//             }
//              {
//                 Object.keys(userLoginGoogle).length != 0 &&
//                 <button onClick={(e) => {
//                     handleSignOut(e)

//                 }} className='btn btn-secondary'>התנתק</button>
//             }
//         </div>
//     )
// }

// export default GoogleRegister