import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  priceSub?: string;
  priceMain: string;
  features: string[];
  popular?: boolean;
  actionText: string;
  variant?: "outline" | "solid";
  onActionClick?: () => void;
}

export const PricingCard = ({
  title,
  priceSub,
  priceMain,
  features,
  popular = false,
  actionText,
  variant = "outline",
  onActionClick,
}: PricingCardProps) => {
  return (
    <Card
      className={`relative p-10 bg-white transition-all duration-300 shadow-lg ${
        popular
          ? "border-2 border-brand-orange scale-105 shadow-xl"
          : "hover:border-brand-green hover:shadow-xl"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <CardContent className="p-0 space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-3 font-radion">{title}</h3>
          <div className="text-4xl font-bold mb-8">
  {priceMain}
  <span className="text-base font-medium text-gray-500 ml-1">{priceSub}</span>
</div>
        </div>

        <ul className="space-y-4 text-brand-grey mb-8">
          {features.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {item}
            </li>
          ))}
        </ul>

        <Button
          onClick={onActionClick}
          variant={variant === "solid" ? "default" : "outline"}
          className={`w-full py-3 font-semibold ${
            variant === "solid"
              ? "bg-brand-orange text-white hover:bg-brand-green"
              : "border-2 border-foreground text-foreground hover:bg-brand-green hover:text-background"
          }`}
        >
          {actionText}
        </Button>
      </CardContent>
    </Card>
  );
};
