import { PricingCard } from "../layouts/PricingCard";
import { useNavigate } from "react-router-dom";

const pricingPlans = [
  {
    title: "Trial",
    priceMain: "Free",
    priceSub: "/ 10 days",
    features: [
      "Up to 10 subscribers",
      "10 calendar events",
      "Analytics & insights",
    ],
    actionText: "Get Started Free",
    variant: "outline" as const,
    redirectTo: "/auth?mode=register",
  },
  {
    title: "Professional",
    priceMain: "$200",
    priceSub: "/mo",
    features: ["Up to 10,000 subscribers", "200 calendar events"],
    popular: true,
    actionText: "Start Professional",
    variant: "solid" as const,
    redirectTo: "/auth?mode=register",
  },
  {
    title: "Enterprise",
    priceMain: "Custom",
    features: [
      "Unlimited subscribers",
      "API access + White-labeling",
      "Dedicated account manager",
    ],
    actionText: "Contact Sales",
    variant: "outline" as const,
    redirectTo: "/contact-us",
  },
];

const PricingSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (redirectTo?: string) => {
    if (redirectTo) navigate(redirectTo);
  };

  return (
    <section
      id="pricing"
      className="py-24 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-green tracking-tight font-radion">
            Simple, Scalable Pricing
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Choose the plan that fits your audience size and needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              onActionClick={() => handleCardClick(plan.redirectTo)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
