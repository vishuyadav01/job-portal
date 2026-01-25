import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Terms and Conditions
        </h1>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>[Your Website Name]</strong>. These Terms and
              Conditions govern your use of our website located at{" "}
              <strong>[Your Website URL]</strong>. By accessing or using our
              website, you agree to comply with these terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              2. Acceptance of Terms
            </h2>
            <p>
              By using our website, you confirm that you accept these Terms and
              Conditions and agree to comply with them. If you do not agree with
              any part of these terms, you must not use our website.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              3. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any
              time. Any changes will be effective immediately upon posting on
              this page. Continued use of the website constitutes acceptance of
              the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              4. User Responsibilities
            </h2>
            <p>
              You agree to use the website only for lawful purposes and in a way
              that does not infringe the rights of, restrict, or inhibit anyone
              else’s use and enjoyment of the website.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              5. Intellectual Property
            </h2>
            <p>
              All content, trademarks, and intellectual property on this website
              are owned by or licensed to <strong>[Your Website Name]</strong>.
              You may not reproduce or distribute content without prior written
              permission.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law,{" "}
              <strong>[Your Website Name]</strong> shall not be liable for any
              indirect or consequential damages arising from your use of the
              website.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              7. Governing Law
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of <strong>[Your Jurisdiction]</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              8. Contact Information
            </h2>
            <p>
              If you have any questions regarding these Terms and Conditions,
              please contact us at{" "}
              <strong>[Your Contact Information]</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
