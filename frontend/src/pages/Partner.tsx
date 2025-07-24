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
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6">Our Partners</h1>
      <p className="text-lg text-gray-700 mb-8">
        We’re proud to collaborate with world-class brands and organizations to deliver the best products and experiences to our customers.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        {partners.map((partner) => (
          <div key={partner.name} className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
            <img src={partner.logo} alt={partner.name} className="h-14 w-14 object-contain rounded bg-white border border-gray-200" />
            <div>
              <h3 className="font-bold text-lg mb-1">{partner.name}</h3>
              <p className="text-gray-600 text-sm">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold text-pink-500 mb-6">Want to partner with us?</h2>
        <a href="mailto:partners@flexishop.com" className="bg-black hover:bg-zinc-800 text-white font-bold px-8 py-3 rounded-full transition">Contact our partnership team</a>
      </div>
    </div>
  );
} 