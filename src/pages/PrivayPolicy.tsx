import Header from "@/components/shared/Header";
import FooterSection from "@/components/index/FooterSection";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header variant="full" />

      <main className="flex-1 p-6 max-w-4xl mx-auto font-[system-ui] text-[14px]">
        <div className="text-center my-10">
          <h1 className="text-[60px] font-normal mb-4">Privacy Policy</h1>
        </div>

        <div className="mb-8">
          <p>
            <em>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-semibold transition-colors hover:underline"
              >
                Effective June 11, 2025
              </a>
            </em>
          </p>
        </div>

        <h2 className="mb-4 text-3xl">Your Privacy Matters.</h2>
        <p className="mb-6">
          We value your privacy. This Privacy Policy explains how we collect, use,
          store, and protect your information when you use our app. By using our
          services, you agree to this policy.
        </p>

        <h3 className="text-xl mt-6 mb-2">1. Information We Collect</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Email address</li>
          <li>Full Name</li>
          <li>Location or time zone</li>
          <li>Access to your calendar</li>
        </ul>

        <h3 className="text-xl mt-6 mb-2">2. How We Use Your Information</h3>
        <ul className="list-disc list-inside mb-4">
          <li>To deliver calendar event updates</li>
          <li>To manage your account and preferences</li>
          <li>To improve app functionality and user experience</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h3 className="text-xl mt-6 mb-2">3. Cookies and Tracking Technologies</h3>
        <p className="mb-4">
          We may use cookies or similar technologies to analyze usage trends,
          administer the app, and gather demographic information. Users can manage
          cookie preferences through their browser settings.
        </p>

        <h3 className="text-xl mt-6 mb-2">4. Sharing of Information</h3>
        <p className="mb-4">
          We do not sell your personal information. We may share your data with
          trusted third-party service providers for hosting, analytics, and support,
          subject to strict confidentiality obligations.
        </p>

        <h3 className="text-xl mt-6 mb-2">5. User Rights and Choices</h3>
        <p className="mb-4">
          You have the right to access, correct, delete, or limit the use of your
          personal data. You can withdraw calendar access at any time. Residents of
          the EU, UK, or California may have additional rights under GDPR or CCPA.
        </p>

        <h3 className="text-xl mt-6 mb-2">6. Data Retention and Security</h3>
        <p className="mb-4">
          We retain your data only as long as necessary for the purposes described.
          We implement security measures to protect your information against
          unauthorized access, alteration, or destruction.
        </p>

        <h3 className="text-xl mt-6 mb-2">7. Children’s Privacy</h3>
        <p className="mb-4">
          The app is not intended for children under the age of 13 (or under 16 in
          the EU/UK). We do not knowingly collect data from minors. If we learn we
          have collected personal information from a child without parental consent,
          we will delete it.
        </p>

        <h3 className="text-xl mt-6 mb-2">8. Changes to this Policy</h3>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We encourage you to
          review it periodically. Continued use of the app after changes means you
          accept the revised policy.
        </p>

        <h3 className="text-xl mt-6 mb-2">9. Contact Us</h3>
        <p className="mb-12">
          For privacy-related questions or requests, contact us at:{" "}
          <strong>[Insert Contact Info]</strong>
        </p>
      </main>

      <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;
