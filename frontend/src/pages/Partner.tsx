import { Button } from "../components/ui/button";
import { Mail } from "lucide-react";

const partners = [
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    description: "Leading technology partner for cloud and productivity solutions."
  },
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    description: "Global leader in sportswear and innovation."
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    description: "Partnering for smarter, faster online experiences."
  },
  {
    name: "Apple",
    logo: "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png",
    description: "Premium devices and seamless integration for our customers."
  },
  {
    name: "Adidas",
    logo: "https://www.freepnglogos.com/uploads/adidas-logo-png-hd-17.png",
    description: "Iconic sports brand, style and performance."
  }
];

export default function Partner() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h1>
      <p className="text-lg text-muted-foreground mb-12">
        We're proud to collaborate with world-class brands and organizations to deliver the best products and experiences to our customers.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {partners.map((partner) => (
          <div key={partner.name} className="bg-card border border-border rounded-lg p-6 flex items-center gap-6">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-14 w-14 object-contain rounded bg-background border border-border p-2"
            />
            <div>
              <h3 className="font-bold text-lg mb-1">{partner.name}</h3>
              <p className="text-muted-foreground text-sm">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Want to partner with us?</h2>
        <a href="mailto:partners@flexishop.com">
          <Button size="lg">
            <Mail className="w-4 h-4 mr-2" />
            Contact our partnership team
          </Button>
        </a>
      </div>
    </div>
  );
}
