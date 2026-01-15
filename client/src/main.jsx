import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./context/AuthContext.jsx";
import { EmployerProvider } from "./context/EmployerContext.jsx";
import { JobProvider } from "./context/JobContext.jsx";
import { JobSeekerProvider } from "./context/JobSeekerContext.jsx";
import { BookmarkProvider } from "./context/BookmarkContext.jsx"; 

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ApplicantProvider } from "./context/ApplicantContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EmployerProvider>
          <JobProvider>
            <JobSeekerProvider>
              <BookmarkProvider>
                <ApplicantProvider>
                  <App />
                  <ToastContainer position="bottom-right" />
                </ApplicantProvider>
              </BookmarkProvider>
            </JobSeekerProvider>
          </JobProvider>
        </EmployerProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
