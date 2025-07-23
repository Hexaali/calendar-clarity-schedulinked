import { CheckCircle } from "lucide-react";

type StepProps = {
  id: number;
  title: string;
  description: string;
  tags?: string[];
  bulletPoints?: string[];
  socialProof?: { name: string; stat: string }[];
  imageSide: "left" | "right";
};

const StepBlock = ({
  id,
  title,
  description,
  tags = [],
  bulletPoints = [],
  socialProof = [],
  imageSide,
}: StepProps) => {
  const isImageLeft = imageSide === "left";

  return (
    <div className={`grid md:grid-cols-2 gap-16 items-center`}>
      {isImageLeft && <ImagePlaceholder />}
      <div className={`space-y-6 ${isImageLeft ? "order-2 md:order-1" : ""}`}>
        <div className="flex items-center gap-4 mb-4">
          <span
            className={`text-white font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center ${
              id % 2 === 0 ? "bg-brand-green" : "bg-brand-orange"
            }`}
          >
            {id}
          </span>
          <h3
            className={`text-3xl font-semibold font-radion ${
              id === 2 ? "text-brand-green" : "text-brand-orange"
            }`}
          >
            {title}
          </h3>
        </div>
        <p className="text-brand-grey text-xl leading-relaxed">{description}</p>

        {tags.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-sm text-muted-foreground font-medium mb-2">
              Perfect for:
            </p>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-white px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {bulletPoints.length > 0 && (
          <div className="space-y-3">
            {bulletPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-brand-green" />
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        )}

        {socialProof.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <p className="text-sm text-muted-foreground font-medium">
              Real Results:
            </p>
            <div className="space-y-3">
              {socialProof.map((proof, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">{proof.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {proof.stat}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {!isImageLeft && <ImagePlaceholder />}
    </div>
  );
};

const ImagePlaceholder = () => (
  <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-lg" />
);

const steps = [
  {
    id: 1,
    title: "One-Click Permission",
    description:
      "Your audience subscribes to your calendar with one tap — no logins, no forms, no friction. They want to hear from you, so they give you permission to reach them where they actually look every day.",
    bulletPoints: [],
    tags: ["🎧 Music releases", "✂️ Appointment reminders", "🛍️ Flash sales"],
    imageSide: "right" as const,
  },
  {
    id: 2,
    title: "Create & Schedule",
    description:
      "Add your content — drops, deadlines, events, or promotions — with media, links, and smart reminders. Everything syncs automatically across Google, Apple, and Outlook calendars.",
    bulletPoints: [
      "Rich media support (images, videos, links)",
      "Cross-platform sync (Google, Apple, Outlook)",
      "Automated reminder sequences",
    ],
    imageSide: "left" as const,
  },
  {
    id: 3,
    title: "Track & Convert",
    description:
      "Events appear in their calendars with built-in visibility and engagement tracking. See what works, optimize what doesn't, and watch your conversion rates soar.",
    bulletPoints: [],
    socialProof: [
      {
        name: "DJ Mixmaster",
        stat: "+42% album release engagement",
      },
      {
        name: "Premium Styles Salon",
        stat: "No-shows dropped from 28% to 7%",
      },
      {
        name: "Urban Boutique",
        stat: "5x more traffic than social posts",
      },
    ],
    imageSide: "right" as const,
  },
];

const HowItWorksSection = () => (
  <section id="how" className="py-24 px-4 md:px-6">
    <div className="container max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-green mb-6 tracking-tight font-radion">
          How It Works
        </h2>
        <p className="text-xl text-brand-grey max-w-3xl mx-auto">
          Three simple steps to transform how you reach your audience — no
          complexity, just results.
        </p>
      </div>

      <div className="space-y-32">
        {steps.map((step) => (
          <StepBlock key={step.id} {...step} />
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
