import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import JobDetailsPage from "./pages/Jobs/JobDetailsPage";
import PageNotFound from "./pages/PageNotFound";
import SavedJobs from "./pages/JobSeeker/SavedJobs";
import AppliedJobs from "./pages/JobSeeker/AppliedJobs";
import PostJob from "./pages/Employer/PostJob";
import ManageJobs from "./pages/Employer/ManageJobs";
import ViewApplicants from "./pages/Employer/ViewApplicants";

import { useAuth } from "./context/AuthContext";
import UpdateProfile from "./pages/JobSeeker/UpdateProfile";
import ViewProfile from "./pages/JobSeeker/ViewProfile";
import RegisterEmployer from "./pages/Auth/RegisterEmployer";
import JobSeekerRegister from "./pages/Auth/RegisterJobseeker";
import JobListingPage from "./pages/Jobs/JobListingPage";
import UpdateEmployerProfile from "./pages/Employer/UpdateEmployerProfile";
import CompanyProfile from "./pages/Employer/CompanyProfile";

function App() {
  const { user, loading } = useAuth();

  // const isEmployer = user?.role === "employer";
  // const isJobSeeker = user?.role === "jobseeker";
  const isJobSeeker = true; // For testing purposes, assume all authenticated users are jobseekers
  const isEmployer = true; // For testing purposes, assume all authenticated users are employers

  return (
    <>
      {}

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

          {/* Auth Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <SignupPage />}
          />
          <Route
            path="/register-employer"
            element={user ? <Navigate to={"/"} /> : <RegisterEmployer />}
          />
          <Route
            path="/register-jobseeker"
            element={user ? <Navigate to={"/"} /> : <JobSeekerRegister />}
          />

          {/* Employer Routes */}
          {isEmployer && (
            <>
              <Route
                path="/employer/update-profile"
                element={<UpdateEmployerProfile />}
              />
              <Route path="/company/:id" element={<CompanyProfile />} />

              <Route path="/employer/post-job" element={<PostJob />} />
              <Route path="/employer/manage-jobs" element={<ManageJobs />} />
              <Route path="/employer/applicants" element={<ViewApplicants />} />
            </>
          )}

          {/* Jobseeker Routes */}
          {isJobSeeker && (
            <>
              <Route path="/jobseeker/profile" element={<ViewProfile />} />
              <Route
                path="/jobseeker/update-profile"
                element={<UpdateProfile />}
              />
              <Route path="/jobseeker/saved-jobs" element={<SavedJobs />} />
              <Route path="/jobseeker/applied-jobs" element={<AppliedJobs />} />
            </>
          )}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
