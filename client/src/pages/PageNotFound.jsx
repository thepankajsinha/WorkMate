import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden bg-gradient-to-br from-[#e9f1ff] via-white to-gray-100">

      {/* Floating Glow Circles */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute w-64 h-64 bg-[#0148D6]/20 blur-3xl rounded-full top-20 left-10"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-72 h-72 bg-[#202020]/10 blur-2xl rounded-full bottom-10 right-10"
      />

      <div className="relative z-10 text-center max-w-xl">
        {/* 404 Number */}
        <motion.h1
          className="text-[80px] md:text-[100px] font-extrabold text-[#0148D6] leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          className="text-xl text-gray-700 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#0148D6] text-white rounded-lg font-medium hover:bg-[#0d3ea9] transition shadow-md"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default PageNotFound;
