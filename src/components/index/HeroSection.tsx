
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="py-24 md:py-32 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-white">
    <div className="container max-w-5xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-green mb-8 leading-tight tracking-tight">
        Connection with the<span className="lg:text-8xl xl:text-8xl text-brand-orange font-bold uppercase"> audience </span>that matters.
      </h1>
      <p className="text-xl md:text-2xl text-brand-grey mb-12 max-w-4xl mx-auto leading-relaxed">
        Calendure puts your content straight into calendars — with reminders — no noise, just visibility that works.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Button asChild size="lg" className="bg-brand-orange text-white hover:bg-brand-green font-semibold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <Link to="/#">Join the Waitlist</Link>
        </Button>
        <Button size="lg" variant="outline" className="border-2 border-foreground text-foreground hover:bg-brand-green hover:text-background font-semibold px-10 py-4 rounded-full text-lg transition-all duration-300">
          <a href="/#how">See How It Works</a>
        </Button>
      </div>
    </div>
  </section>
);

export default HeroSection; 
