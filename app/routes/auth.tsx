
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { usePuterStore } from "~/lib/puter";

import Login from "../Components/Login";

export const meta = () => [
  {
    title: "Resmind | Auth",
  },
  {
    name: "description",
    content: "Log into your account",
  },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const next = params.get("next");

  /*
   * After successful authentication,
   * redirect to the requested page.
   */
  useEffect(() => {
    if (auth.isAuthenticated && next) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <Login
      isLoading={isLoading}
      isAuthenticated={auth.isAuthenticated}
      onLogin={auth.signIn}
      onLogout={auth.signOut}
    />
  );
};

export default Auth;



































// import React, { useEffect } from 'react'
// import { usePuterStore } from '~/lib/puter'
// import {useLocation,useNavigate} from "react-router"
// export const meta=()=>([
//     {title:'Resumind | Auth'},
//     {name:'description', content:'Log into your account'}
// ])
// const Auth = () => {
//     const { isLoading ,auth}=usePuterStore();
//     const location=useLocation();
   
//     const params = new URLSearchParams(location.search);
//     const next = params.get("next") ;
//     const navigate=useNavigate();

//     useEffect(()=>{
//         if(auth.isAuthenticated && next) navigate(next);
//     },[auth.isAuthenticated,next]
//     )

//   return (
//     <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center p-4">
//         <div className="gradient-border shadow-2xl w-full max-w-xl">
//             <section className="flex flex-col gap-10 bg-white rounded-2xl p-6 sm:p-12">
//                 <div className="flex flex-col items-center gap-4 text-center">
//                     <h1 className="text-5xl sm:text-7xl">welcome</h1>
//                     <h2 className="text-lg sm:text-2xl text-gray-500 font-medium">Log in to continue your Job Journey</h2>
//                 </div>
//                 <div className="w-full flex justify-center">
//                     {isLoading?(
//                         <button className='auth-button animate-pulse flex items-center justify-center'>
//                             <span>signing you in...</span>
//                         </button>
//                     ) :(
//                         <div className="w-full flex justify-center">
//                         {auth.isAuthenticated?(
//                             <button className="auth-button" onClick={auth.signOut}>
//                                 Log Out
//                             </button>
//                         ):(<button className="auth-button" onClick={auth.signIn}>
//                                 LogIn
//                             </button>)}
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </div>
//     </main>
//   )
// }

// export default Auth