export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-muted-foreground mb-12">
        FlexiShop was founded with a simple mission: to bring the best of tech, fashion, and lifestyle products to everyone, everywhere. We believe in quality, speed, and customer happiness.
      </p>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-muted-foreground mb-4">
          Since our launch, we've helped thousands of customers discover new products and enjoy a seamless shopping experience. Our team is passionate about innovation and service.
        </p>
        <p className="text-muted-foreground">
          We're constantly growing, listening to your feedback, and improving our platform to serve you better every day.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <ul className="list-disc ml-6 text-muted-foreground space-y-2">
          <li>Customer First: Your satisfaction is our top priority.</li>
          <li>Innovation: We embrace new ideas and technologies.</li>
          <li>Integrity: We act with honesty and transparency.</li>
          <li>Diversity: We celebrate differences and inclusivity.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team member" className="w-20 h-20 rounded-full mb-3 object-cover" />
            <span className="font-semibold">Alex T.</span>
            <span className="text-muted-foreground text-sm">CEO & Founder</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team member" className="w-20 h-20 rounded-full mb-3 object-cover" />
            <span className="font-semibold">Emily R.</span>
            <span className="text-muted-foreground text-sm">Head of Operations</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Team member" className="w-20 h-20 rounded-full mb-3 object-cover" />
            <span className="font-semibold">Chris S.</span>
            <span className="text-muted-foreground text-sm">Lead Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
