import type { Route } from "./+types/home";
import Navbar from "~/Components/Navbar";
import { resumes } from "~/constants/index";
import ResumeCard from "~/Components/ResumeCard";
import { usePuterStore } from '~/lib/puter'
import {useLocation,useNavigate} from "react-router"
import React, { useEffect } from 'react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resmind" },
    { name: "description", content: "Smart Feedback for Your DREAM JOB!" },
  ];
}

export default function Home() {
  
    const { auth}=usePuterStore();
    const location=useLocation();
    const navigate=useNavigate();

    useEffect(()=>{
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    },[auth.isAuthenticated]);
  

  

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <section className="main-section">
      <Navbar/>
      <div className="page-heading py-16">
        <h1>Track your Application and Resume Rating</h1>
        <h2>Review your submissions and check AI powered feedback</h2>
      </div>
    </section>

  {resumes.length > 0 &&(
  <div className="resume-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

  {resumes.map((Resume) => (
  <ResumeCard key={Resume.id} resume={Resume}/>
    
 
))}
 </div>
)}

  </main>
}
