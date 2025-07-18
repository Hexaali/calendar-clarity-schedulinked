import { PricingCard } from "../layouts/PricingCard";

const pricingPlans = [
  {
    title: "Starter",
    price: "Free",
    features: [
      "Up to 50 subscribers",
      "5 calendar events/month",
      "Basic analytics",
    ],
    actionText: "Get Started Free",
    variant: "outline" as const,
  },
  {
    title: "Professional",
    price: "£49/mo",
    features: [
      "Up to 5,000 subscribers",
      "Unlimited calendar events",
      "Advanced analytics & insights",
      "Custom branding",
    ],
    popular: true,
    actionText: "Start Professional",
    variant: "solid" as const,
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited subscribers",
      "API access + White-labeling",
      "Dedicated account manager",
      "Custom integrations",
    ],
    actionText: "Contact Sales",
    variant: "outline" as const,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-white">
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
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
