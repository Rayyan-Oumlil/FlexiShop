import { Button } from "../components/ui/button";
import { Mail } from "lucide-react";

export default function Careers() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Careers</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Join FlexiShop and help us shape the future of online shopping! We're always looking for passionate, talented people to join our team.
      </p>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Culture</h2>
        <p className="text-muted-foreground mb-4">
          We value creativity, collaboration, and a drive for excellence. At FlexiShop, you'll work with a diverse team in a fast-paced, supportive environment.
        </p>
        <ul className="list-disc ml-6 text-muted-foreground space-y-2">
          <li>Remote-friendly and flexible hours</li>
          <li>Continuous learning and growth</li>
          <li>Inclusive and welcoming culture</li>
          <li>Competitive salary and benefits</li>
        </ul>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Frontend Developer</h3>
              <p className="text-muted-foreground text-sm mb-2">Remote | Full-time</p>
              <p className="text-muted-foreground text-sm">Build beautiful, performant web interfaces with React and TypeScript.</p>
            </div>
            <a href="mailto:jobs@flexishop.com?subject=Application%20for%20Frontend%20Developer">
              <Button variant="outline">Apply</Button>
            </a>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Customer Support Specialist</h3>
              <p className="text-muted-foreground text-sm mb-2">Paris or Remote | Full-time</p>
              <p className="text-muted-foreground text-sm">Help our customers have the best experience possible, every day.</p>
            </div>
            <a href="mailto:jobs@flexishop.com?subject=Application%20for%20Customer%20Support%20Specialist">
              <Button variant="outline">Apply</Button>
            </a>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Marketing Intern</h3>
              <p className="text-muted-foreground text-sm mb-2">Paris | Internship</p>
              <p className="text-muted-foreground text-sm">Assist with campaigns, social media, and content creation.</p>
            </div>
            <a href="mailto:jobs@flexishop.com?subject=Application%20for%20Marketing%20Intern">
              <Button variant="outline">Apply</Button>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Ready to join us?</h2>
        <a href="mailto:jobs@flexishop.com">
          <Button size="lg">
            <Mail className="w-4 h-4 mr-2" />
            Send your application
          </Button>
        </a>
      </div>
    </div>
  );
}
