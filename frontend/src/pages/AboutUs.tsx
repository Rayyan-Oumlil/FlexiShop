export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6">About Us</h1>
      <p className="text-lg text-gray-700 mb-8">
        FlexiShop was founded with a simple mission: to bring the best of tech, fashion, and lifestyle products to everyone, everywhere. We believe in quality, speed, and customer happiness.
      </p>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-pink-500 mb-3">Our Story</h2>
        <p className="text-gray-600 mb-2">
          Since our launch, we’ve helped thousands of customers discover new products and enjoy a seamless shopping experience. Our team is passionate about innovation and service.
        </p>
        <p className="text-gray-600">
          We’re constantly growing, listening to your feedback, and improving our platform to serve you better every day.
        </p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-pink-500 mb-3">Our Values</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Customer First: Your satisfaction is our top priority.</li>
          <li>Innovation: We embrace new ideas and technologies.</li>
          <li>Integrity: We act with honesty and transparency.</li>
          <li>Diversity: We celebrate differences and inclusivity.</li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-pink-500 mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team member" className="w-20 h-20 rounded-full mb-2 shadow" />
            <span className="font-semibold">Alex T.</span>
            <span className="text-gray-500 text-sm">CEO & Founder</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team member" className="w-20 h-20 rounded-full mb-2 shadow" />
            <span className="font-semibold">Emily R.</span>
            <span className="text-gray-500 text-sm">Head of Operations</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Team member" className="w-20 h-20 rounded-full mb-2 shadow" />
            <span className="font-semibold">Chris S.</span>
            <span className="text-gray-500 text-sm">Lead Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
} 