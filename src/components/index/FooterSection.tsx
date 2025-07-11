
const FooterSection = () => (
  <footer className="bg-background border-t">
    <div className="container px-4 md:px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/2dac7733-cabb-4791-bcb3-b2a0608ce1c2.png" alt="Schedulinked Logo" className="h-8 w-" />
            <div className="text-2xl font-bold text-foreground tracking-tight">Schedulinked</div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Marketing people actually want. Put your content straight into calendars with reminders, media, and automation.
          </p>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              We're not trying to fix email. We're skipping it entirely. At Schedulinked, we believe your calendar isn't just for meetings — it's where attention lives.
            </p>
          </div>
        </div>
        {/* Product Links */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#how" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
            <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Documentation</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</a></li>
          </ul>
        </div>
        {/* Company Links */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
          </ul>
        </div>
        {/* Support Links */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Status Page</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
          </ul>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-sm">
          © 2025 Schedulinked. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
