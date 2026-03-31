import type { Route } from "./+types/home";
import Navbar from "~/Components/Navbar";
//import { resumes } from "~/constants/index";
import ResumeCard from "~/Components/ResumeCard";
import { usePuterStore } from '~/lib/puter'
import {useLocation,useNavigate} from "react-router"
import React, { useEffect, useState } from 'react'
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resmind" },
    { name: "description", content: "Smart Feedback for Your DREAM JOB!" },
  ];
}

export default function Home() {
  
    const { auth,kv}=usePuterStore();
    const location=useLocation();
    const navigate=useNavigate();
    const [resumes,setResumes]=useState<Resume[]>([]);
    const [loadingResumes,setLoadingResumes]=useState(false);
    

    useEffect(()=>{
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    },[auth.isAuthenticated]);

  useEffect(()=>{
    const loadResumes=async()=>{
      setLoadingResumes(true);
      const resumes = (await kv.list('resume:*',true)) as KVItem[];
      const parsedResumes=resumes?.map((resume)=>(
        JSON.parse(resume.value) as Resume
      ))
      
      console.log("parsedResumes")
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }
    loadResumes();
  },[])

  

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <section className="main-section">
      <Navbar/>
      <div className="page-heading py-16">
        <h1>Track your Application and Resume Rating</h1>
        {!loadingResumes && resumes?.length===0?(
          <h2>No resumes found.Upload your first resume to get feedback</h2>
        ):(
        <h2>Review your submissions and check AI powered feedback</h2>
        )}
      </div>

      {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]"/>
          </div>
      )}
   

  {!loadingResumes && resumes.length > 0 &&(
  <div className="resume-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

  {resumes.map((Resume) => (
  <ResumeCard key={Resume.id} resume={Resume}/>
    
 
))}
 </div>
)}


{!loadingResumes && resumes?.length===0 &&(
  <div className="flex flex-col item-center justify-center mt-10 gap-4">
    <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
    Upload Resume</Link>
  </div>
)}
 </section>
  </main>
}
