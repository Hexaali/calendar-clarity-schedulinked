import { CheckCircle } from "lucide-react";

type StepProps = {
  id: number;
  title: string;
  description: string;
  tags?: string[];
  bulletPoints?: string[];
  socialProof?: { name: string; stat: string }[];
  imageSide: "left" | "right";
  imageUrl?: string;
};

const StepBlock = ({
  id,
  title,
  description,
  tags = [],
  bulletPoints = [],
  socialProof = [],
  imageSide,
  imageUrl,
}: StepProps) => {
  const isImageLeft = imageSide === "left";

  return (
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className={`space-y-6 ${isImageLeft ? "md:order-2" : "md:order-1"}`}>
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
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600 flex-shrink-0" />

                <span className="text-gray-700">
                  {point.includes("Outlook") ? (
                    <>
                      Cross-platform sync (Google, Apple, Outlook{" "}
                      <span className="italic ml-1 px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-md animate-pulse">
                        Upcoming
                      </span>
                      )
                    </>
                  ) : (
                    point
                  )}
                </span>
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
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full" />
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

      <div className={`${isImageLeft ? "md:order-1" : "md:order-2"}`}>
        <StepImage src={imageUrl} />
      </div>
    </div>
  );
};

const StepImage = ({ src }: { src?: string }) => (
  <>
    {src ? (
      <img src={src} alt="Calendure" className="w-full h-96 object-contain" />
    ) : (
      <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
    )}
  </>
);

const steps: StepProps[] = [
  {
    id: 1,
    title: "One-Click Permission",
    description:
      "Your audience lets you into their calendar with one step — with minimal friction. They want to hear from you, so they give you permission to reach them where they actually look every day.",
    tags: ["🎭 Artists", "🏋️ Athletes", "🎓 Academic Schedules"],
    imageSide: "right",
    imageUrl: "/profileCard.png",
  },
  {
    id: 2,
    title: "Inform & Announce",
    description:
      "What you are upto, when is it happening, and how can your audience be part of it — create calendar events with clear agenda — with location, link, and smart reminders. Everything syncs automatically across Google, Apple, and Outlook calendars.",
    bulletPoints: [
      "Rich media support (images, videos, links)",
      "Cross-platform sync (Google, Apple, Outlook)",
      "Automated reminder sequences",
    ],
    imageSide: "left",
    imageUrl: "/createEvent.png",
  },
  {
    id: 3,
    title: "We Calendure",
    description:
      "Events appear in your audience's calendars with built-in visibility and reminders — your audience does not have to install any app and events are part of their native Google and Apple calendars",

    imageSide: "right",
    imageUrl: "/images/step3.jpg",
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
