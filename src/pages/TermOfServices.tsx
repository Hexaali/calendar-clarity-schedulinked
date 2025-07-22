import Header from "@/components/shared/Header";
import FooterSection from "@/components/index/FooterSection";

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Description of Service",
      content: `Our platform allows users to subscribe to receive calendar events (such as concerts or appearances)
from Event Publishers. After consent is provided, selected events are added to the user’s calendar
(Google or Apple) automatically. The service is intended for personal, non-commercial use only.`,
    },
    {
      title: "2. User Eligibility",
      content: `To use the app, you must be at least 13 years of age (or 16 in the European Union or United
Kingdom). By using the app, you represent and warrant that you meet this age requirement. We
reserve the right to terminate access for users who violate this age requirement.`,
    },
    {
      title: "3. Account Registration and Security",
      content: `Users may access the service by authenticating through third-party calendar services
(Google/Apple). Some features may require account creation. You agree to provide accurate and
complete information and to keep it up-to-date. You are solely responsible for maintaining the
confidentiality of your login credentials and for all activities that occur under your account.`,
    },
    {
      title: "4. Event Content and Responsibility",
      content: `Events are created and uploaded by third-party Event Publishers. We do not verify the accuracy,
truthfulness, or reliability of the event content. You acknowledge and agree that we are not liable
for any errors, cancellations, changes, or misrepresentations related to events posted on the
platform.`,
    },
    {
      title: "5. Subscriptions and Payments",
      content: `Event Publishers may be required to pay a subscription fee to access posting and promotion
features. All payments are processed through third-party payment providers and are subject to their
terms and policies. Subscription fees are generally non-refundable, except where required by law.`,
    },
    {
      title: "12. Contact Information",
      content: (
        <>
          By connecting your calendar, you consent to receive event updates
          directly to your calendar. You may revoke this consent at any time by
          accessing your calendar provider’s settings (e.g., Google or Apple),
          or by sending an email from the email address associated with your
          calendar account to
          <img
            src="/email.png"
            alt="Email address"
            className="inline-block h-6 sm:h-8 md:h-10 ml-2 mb-2"
          />
        </>
      ),
    },
    {
      title: "7. Intellectual Property",
      content: `All trademarks, logos, and content on the platform remain the property of their respective owners.
You may not reproduce, distribute, or otherwise exploit any content unless explicitly permitted.`,
    },
    {
      title: "8. Modifications to Terms and Services",
      content: `We may modify these Terms or the services at any time. We will notify users of significant
changes. Continued use after any such modification constitutes your acceptance of the revised
Terms.`,
    },
    {
      title: "9. Disclaimer of Warranties",
      content: `The app and its services are provided "as is" and "as available" without warranties of any kind,
either express or implied. We do not guarantee the accuracy or reliability of any event or content
published through the app.`,
    },
    {
      title: "10. Limitation of Liability",
      content: `To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental,
consequential, or punitive damages arising out of your use of the service or participation in any
event.`,
    },
    {
      title: "11. Governing Law",
      content: `These Terms shall be governed by and construed in accordance with the laws of Pakistan, without
regard to its conflict of law principles.`,
    },
    {
      title: "12. Contact Information",
      content: (
        <>
          If you have questions about these Terms, you may contact us at:
          <img
            src="/email.png"
            alt="Email address"
            className="inline-block h-6 sm:h-8 md:h-10 ml-2 mb-2"
          />
        </>
      ),
    },
    {
      title: "13. Disclaimer",
      content: `We act solely as a technology provider. We do not endorse or verify any particular Event Publisher
or event. Users should exercise discretion and verify events before attending or purchasing tickets.
Use of this platform is at your own risk.`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header variant="full" />

      <main className="flex-1 px-4 sm:px-6 md:px-8 py-10 max-w-4xl mx-auto font-sans text-sm sm:text-base leading-relaxed">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
            Terms of Service
          </h1>
          <p className="flex place-items-start py-4">
            <em className="flex flex-col">
              <a
                href="#"
                className="text-black font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>
                Effective Date: {" "}
                </strong>
                July 17, 2025
              </a>
              <a
                href="#"
                className="text-black font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>
                Last Updated: 
                </strong>{" "}
                July 17, 2025
              </a>
            </em>
          </p>
        </header>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-brand-green">
              Please Read Carefully
            </h2>
            <p>
              Welcome to our app. These Terms of Service ("Terms") govern your
              use of our platform, which enables users to subscribe to calendar
              events created by Event Publishers. By accessing or using the app,
              you agree to comply with and be bound by these Terms. If you do
              not agree with these Terms, please do not use our app.
            </p>
          </div>

          {sections.map(({ title, content }) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-brand-orange mb-2">
                {title}
              </h3>
              {typeof content === "string" ? <p>{content}</p> : content}
            </div>
          ))}
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default TermsOfService;
