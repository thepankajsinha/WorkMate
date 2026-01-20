import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import JobDetailsPage from "./pages/Jobs/JobDetailsPage";
import PageNotFound from "./pages/PageNotFound";
import SavedJobs from "./pages/JobSeeker/SavedJobs";
import AppliedJobs from "./pages/JobSeeker/AppliedJobs";
import PostJob from "./pages/Employer/PostJob";
import ManageJobs from "./pages/Employer/ManageJobs";
import ViewApplicants from "./pages/Employer/ViewApplicants";
import UpdateProfile from "./pages/JobSeeker/UpdateProfile";
import ViewProfile from "./pages/JobSeeker/ViewProfile";
import RegisterEmployer from "./pages/Auth/RegisterEmployer";
import JobSeekerRegister from "./pages/Auth/RegisterJobseeker";
import JobListingPage from "./pages/Jobs/JobListingPage";
import UpdateEmployerProfile from "./pages/Employer/UpdateEmployerProfile";

import { useAuth } from "./context/AuthContext";
import JobseekerPublicProfile from "./pages/JobSeeker/JobseekerPublicProfile";
import EmployerPublicProfile from "./pages/Employer/EmployerPublicProfile";
import UpdateUser from "./pages/Auth/UpdateUser";
import ResumeAnalysisPage from "./pages/JobSeeker/ResumeAnalysis";
import JobMatchPage from "./pages/JobSeeker/JobMatchPage";

function App() {
  const { user, loading } = useAuth();

  const isEmployer = user?.role === "employer";
  const isJobSeeker = user?.role === "jobseeker";

  return (
    <>
      <Navbar />

      <div
        className={`${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobListingPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/jobseeker/public/:jobSeekerId" element={<JobseekerPublicProfile />} />
          <Route path="/employer/public/:employerId" element={<EmployerPublicProfile />} />

          {/* Auth Routes */}
          <Route path="/login" element={user ? <Navigate to={"/"} /> : <LoginPage />} />
          <Route path="/register-employer" element={user ? <Navigate to={"/"} /> : <RegisterEmployer />}/>
          <Route path="/register-jobseeker" element={user ? <Navigate to={"/"} /> : <JobSeekerRegister />} />
          <Route path="/user-update" element={user ? <UpdateUser /> : <Navigate to= {"/login"} />} />

          {/* Employer Routes */}
          {isEmployer && (
            <>
              <Route path="/employer/update-profile" element={<UpdateEmployerProfile />} />
              <Route path="/employer/post-job" element={<PostJob />} />
              <Route path="/employer/manage-jobs" element={<ManageJobs />} />
              <Route path="/employer/applicants" element={<ViewApplicants />} />
            </>
          )}

          {/* Jobseeker Routes */}
          {isJobSeeker && (
            <>
              <Route path="/jobseeker/profile" element={<ViewProfile />} />
              <Route path="/jobseeker/update-profile" element={<UpdateProfile />}/>
              <Route path="/jobseeker/saved-jobs" element={<SavedJobs />} />
              <Route path="/jobseeker/applied-jobs" element={<AppliedJobs />} />
              <Route path="/jobseeker/resume-analysis" element={<ResumeAnalysisPage />} />
              <Route path="/jobseeker/job-match" element={<JobMatchPage />} />
            </>
          )}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
