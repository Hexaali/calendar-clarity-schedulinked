
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const PricingSection = () => (
  <section id="pricing" className="py-24 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-white">
    <div className="container max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-radion">Simple, Scalable Pricing</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the plan that fits your audience size and needs.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="p-10 hover:border-[#C9FF57] transition-all duration-300 shadow-lg hover:shadow-xl border-0 bg-white">
          <CardContent className="p-0 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3 font-radion">Starter</h3>
              <div className="text-4xl font-bold mb-8">Free</div>
            </div>
            <ul className="space-y-4 text-muted-foreground mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Up to 50 subscribers
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                5 calendar events/month
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Basic analytics
              </li>
            </ul>
            <Button variant="outline" className="w-full border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold py-3">
              Get Started Free
            </Button>
          </CardContent>
        </Card>
        <Card className="p-10 border-[#C9FF57] border-2 shadow-xl scale-105 bg-white relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-[#C9FF57] text-black px-4 py-2 rounded-full text-sm font-semibold">
              Most Popular
            </span>
          </div>
          <CardContent className="p-0 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3 font-radion">Professional</h3>
              <div className="text-4xl font-bold mb-8">£49/mo</div>
            </div>
            <ul className="space-y-4 text-muted-foreground mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Up to 5,000 subscribers
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Unlimited calendar events
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Advanced analytics & insights
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Custom branding
              </li>
            </ul>
            <Button className="w-full bg-[#C9FF57] text-black hover:bg-[#b6ea4d] font-semibold py-3">
              Start Professional
            </Button>
          </CardContent>
        </Card>
        <Card className="p-10 hover:border-[#C9FF57] transition-all duration-300 shadow-lg hover:shadow-xl border-0 bg-white">
          <CardContent className="p-0 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3 font-radion">Enterprise</h3>
              <div className="text-4xl font-bold mb-8">Custom</div>
            </div>
            <ul className="space-y-4 text-muted-foreground mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Unlimited subscribers
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                API access + White-labeling
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Dedicated account manager
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Custom integrations
              </li>
            </ul>
            <Button variant="outline" className="w-full border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold py-3">
              Contact Sales
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

export default PricingSection;
