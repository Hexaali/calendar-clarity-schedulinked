import Header from "@/components/shared/Header";
import FooterSection from "@/components/index/FooterSection";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Email address/Full Name</li>
          <li>Time zone</li>
          <li>Access to your calendar</li>
        </ul>
      ),
    },
    {
      title: "2. How We Use Your Information",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>To deliver calendar event updates</li>
          <li>To manage your account and preferences</li>
          <li>To improve app functionality and user experience</li>
          <li>To comply with legal obligations</li>
        </ul>
      ),
    },
    {
      title: "3. Cookies and Tracking Technologies",
      content:
        "We may use cookies or similar technologies to analyze usage trends, administer the app, and gather demographic information. Users can manage cookie preferences through their browser settings.",
    },
    {
      title: "4. Sharing of Information",
      content:
        "We do not sell your personal information. We may share your data with trusted third-party service providers for hosting, analytics, and support, subject to strict confidentiality obligations.",
    },
    {
      title: "5. User Rights and Choices",
      content:
        "You have the right to access, correct, delete, or limit the use of your personal data. You can withdraw calendar access at any time. Residents of the EU, UK, or California may have additional rights under GDPR or CCPA.",
    },
    {
      title: "6. Data Retention and Security",
      content:
        "We retain your data only as long as necessary for the purposes described. We implement security measures to protect your information against unauthorized access, alteration, or destruction.",
    },
    {
      title: "7. Children’s Privacy",
      content:
        "The app is not intended for children under the age of 13 (or under 16 in the EU/UK). We do not knowingly collect data from minors. If we learn we have collected personal information from a child without parental consent, we will delete it.",
    },
    {
      title: "8. Changes to this Policy",
      content:
        "We may update this Privacy Policy from time to time. We encourage you to review it periodically. Continued use of the app after changes means you accept the revised policy.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header variant="full" />

      <main className="flex-1 px-4 sm:px-6 md:px-8 py-10 max-w-4xl mx-auto font-sans text-sm sm:text-base leading-relaxed">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            Privacy Policy
          </h1>
          <p>
            <em>
              <a
                href="#"
                className="text-black font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Effective July 15, 2025
              </a>
            </em>
          </p>
        </header>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-brand-green">Your Privacy Matters</h2>
            <p>
              We value your privacy. This Privacy Policy explains how we collect,
              use, store, and protect your information when you use our app. By
              using our services, you agree to this policy.
            </p>
          </div>

          {sections.map(({ title, content }) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-brand-orange mb-2">{title}</h3>
              {typeof content === "string" ? <p>{content}</p> : content}
            </div>
          ))}

          <p className="mt-8">
  For privacy-related questions or requests,{" "}
  <a
    href="/contact-us"
    className="text-brand-orange font-medium hover:underline"
  >
    CONTACT US
  </a>
  .
</p>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;
