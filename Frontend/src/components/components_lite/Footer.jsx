import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center space-y-3">
        {/* Copyright */}
        <p className="text-sm">
          © 2026. All rights reserved.
        </p>

        {/* Credits */}
        <p className="text-sm flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
          <span>
            Powered by{" "}
            <a
              href="https://github.com/vishuyadav01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Vishu Yadav
            </a>
          </span>
          <span className="hidden sm:inline">|</span>
          <span>
            Powered by{" "}
            <a
              href="https://github.com/Ak-Anuj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Anuj Kumar
            </a>
          </span>
        </p>

        {/* Legal Links */}
        <p className="text-sm flex justify-center gap-2 flex-wrap">
          <Link
            to="/PrivacyPolicy"
            className="hover:underline text-blue-600"
          >
            Privacy Policy
          </Link>
          <span>|</span>
          <Link
            to="/TermsofService"
            className="hover:underline text-blue-600"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
