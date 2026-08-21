import type { Route } from "./+types/home";
import Navbar from "~/Components/Navbar";
//import { resumes } from "~/constants/index";
// import ResumeCard from "~/Components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Hero from "~/Components/Hero";
import UploadedResume from "../Components/UploadedResume";
import Features from "~/Components/Feature";
import Testimonials from "~/Components/Testimonials";
import Footer from "~/Components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resmind" },
    { name: "description", content: "Smart Feedback for Your DREAM JOB!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );

      console.log("parsedResumes");
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <main>
      <section className="main-section">
        <Navbar uploadedResumes={resumes} />
        <Hero />

        

        {/* {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-10">
            <img
              src="/images/resume-scan-2.gif"
              className="w-48 h-48 sm:w-64 sm:h-64"
              alt="Loading..."
            />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section" id="resumes">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )} */}

        <UploadedResume
  resumes={resumes}
  loadingResumes={loadingResumes}
/>

<Features/>
<Testimonials/>
<Footer/>

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-6">
            <Link
              to="/upload"
              className="primary-button max-w-xs text-xl font-semibold"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
