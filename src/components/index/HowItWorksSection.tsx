
import { CheckCircle } from "lucide-react";

const HowItWorksSection = () => (
  <section id="how" className="py-24 px-4 md:px-6">
    <div className="container max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-radion">How It Works</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Three simple steps to transform how you reach your audience — no complexity, just results.
        </p>
      </div>
      <div className="space-y-32">
        {/* Step 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#C9FF57] text-black font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center">1</span>
              <h3 className="text-3xl font-semibold font-radion">One-Click Permission</h3>
            </div>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Your audience subscribes to your calendar with one tap — no logins, no forms, no friction. They want to hear from you, so they give you permission to reach them where they actually look every day.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-muted-foreground font-medium mb-2">Perfect for:</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white px-3 py-1 rounded-full text-sm">🎧 Music releases</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm">✂️ Appointment reminders</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm">🛍️ Flash sales</span>
              </div>
            </div>
          </div>
          <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-lg"></div>
        </div>
        {/* Step 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-lg"></div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#C9FF57] text-black font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center">2</span>
              <h3 className="text-3xl font-semibold font-radion">Create & Schedule</h3>
            </div>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Add your content — drops, deadlines, events, or promotions — with media, links, and smart reminders. Everything syncs automatically across Google, Apple, and Outlook calendars.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-muted-foreground">Rich media support (images, videos, links)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-muted-foreground">Cross-platform sync (Google, Apple, Outlook)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-muted-foreground">Automated reminder sequences</span>
              </div>
            </div>
          </div>
        </div>
        {/* Step 3 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#C9FF57] text-black font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center">3</span>
              <h3 className="text-3xl font-semibold font-radion">Track & Convert</h3>
            </div>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Events appear in their calendars with built-in visibility and engagement tracking. See what works, optimize what doesn't, and watch your conversion rates soar.
            </p>
            {/* Social Proof Integration */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <p className="text-sm text-muted-foreground font-medium">Real Results:</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">DJ Mixmaster</p>
                    <p className="text-xs text-muted-foreground">+42% album release engagement</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Premium Styles Salon</p>
                    <p className="text-xs text-muted-foreground">No-shows dropped from 28% to 7%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Urban Boutique</p>
                    <p className="text-xs text-muted-foreground">5x more traffic than social posts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-lg"></div>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
