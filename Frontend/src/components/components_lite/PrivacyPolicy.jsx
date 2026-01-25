import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Privacy Policy for Job Portal
        </h1>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          {/* 1 */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy outlines how we collect, use, and protect your
              information when you visit our job portal website.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              2. Information We Collect
            </h2>

            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Personal Information:</strong>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Resume / CV</li>
                </ul>
              </li>

              <li>
                <strong>Usage Data:</strong>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Pages visited</li>
                  <li>Time spent on pages</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>To provide and maintain our services</li>
              <li>To notify you about changes to our services</li>
              <li>To allow participation in interactive features</li>
              <li>To provide customer support</li>
              <li>To analyze and improve our services</li>
              <li>To monitor usage and performance</li>
              <li>To detect and prevent technical issues</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              4. Data Security
            </h2>
            <p>
              We take the security of your personal information seriously and
              implement appropriate technical and organizational measures to
              protect it.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              5. Sharing Your Information
            </h2>
            <p>
              We do not sell or rent your personal information to third parties.
              We may share your information with:
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Service providers assisting in platform operations</li>
              <li>Law enforcement agencies when required by law</li>
            </ul>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              6. Your Rights
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Access your personal information</li>
              <li>Request correction of your information</li>
              <li>Request deletion of your information</li>
            </ul>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              7. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact
              us at <strong>[your email address]</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
