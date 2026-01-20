import JobSeeker from "../models/jobseekerModel.js";

// ✅ Get IST Date Key (YYYY-MM-DD)
const getDateKeyIST = () => {
  const now = new Date();
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const ist = new Date(now.getTime() + istOffsetMs);
  return ist.toISOString().slice(0, 10);
};

// ✅ Reset daily credits if date changed
const resetDailyCreditsIfNeeded = (jobSeeker) => {
  const todayKey = getDateKeyIST();

  if (jobSeeker.aiUsage?.lastResetDate !== todayKey) {
    jobSeeker.aiUsage.lastResetDate = todayKey;
    jobSeeker.aiUsage.resumeAnalysisCount = 1;
    jobSeeker.aiUsage.jobMatchCount = 1;
  }

  return jobSeeker;
};

/**
 * ✅ feature = "resume" or "jobmatch"
 */
export const useAiDailyCredit = (feature) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?._id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      let jobSeeker = await JobSeeker.findOne({ user: userId });

      if (!jobSeeker) {
        return res.status(404).json({
          success: false,
          message: "JobSeeker profile not found",
        });
      }

      // ✅ Ensure aiUsage exists (for old users)
      if (!jobSeeker.aiUsage) {
        jobSeeker.aiUsage = {
          resumeAnalysisCount: 1,
          jobMatchCount: 1,
          lastResetDate: "",
        };
      }

      // ✅ Reset if new day
      jobSeeker = resetDailyCreditsIfNeeded(jobSeeker);

      // ✅ Decrease credit
      if (feature === "resume") {
        if (jobSeeker.aiUsage.resumeAnalysisCount <= 0) {
          return res.status(429).json({
            success: false,
            message:
              "Daily limit reached: Resume Analysis can be used only 1 time per day.",
          });
        }

        jobSeeker.aiUsage.resumeAnalysisCount -= 1;
      }

      if (feature === "jobmatch") {
        if (jobSeeker.aiUsage.jobMatchCount <= 0) {
          return res.status(429).json({
            success: false,
            message:
              "Daily limit reached: Job Match can be used only 1 time per day.",
          });
        }

        jobSeeker.aiUsage.jobMatchCount -= 1;
      }

      await jobSeeker.save();

      // ✅ Optional: attach usage info for frontend
      req.aiUsage = jobSeeker.aiUsage;

      next();
    } catch (error) {
      console.log("AI Daily Credit Error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  };
};
