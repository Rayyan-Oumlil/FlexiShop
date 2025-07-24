export default function Careers() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6">Careers</h1>
      <p className="text-lg text-gray-700 mb-8">
        Join FlexiShop and help us shape the future of online shopping! We’re always looking for passionate, talented people to join our team.
      </p>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-pink-500 mb-3">Our Culture</h2>
        <p className="text-gray-600 mb-2">
          We value creativity, collaboration, and a drive for excellence. At FlexiShop, you’ll work with a diverse team in a fast-paced, supportive environment.
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Remote-friendly and flexible hours</li>
          <li>Continuous learning and growth</li>
          <li>Inclusive and welcoming culture</li>
          <li>Competitive salary and benefits</li>
        </ul>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-pink-500 mb-6">Open Positions</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Frontend Developer</h3>
              <p className="text-gray-600 text-sm mb-2">Remote | Full-time</p>
              <p className="text-gray-700 text-sm">Build beautiful, performant web interfaces with React and TypeScript.</p>
            </div>
            <a href="mailto:jobs@flexishop.com?subject=Application%20for%20Frontend%20Developer" className="mt-4 md:mt-0 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-full transition">Apply</a>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Customer Support Specialist</h3>
              <p className="text-gray-600 text-sm mb-2">Paris or Remote | Full-time</p>
              <p className="text-gray-700 text-sm">Help our customers have the best experience possible, every day.</p>
            </div>
            <a href="mailto:jobs@flexishop.com?subject=Application%20for%20Customer%20Support%20Specialist" className="mt-4 md:mt-0 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-full transition">Apply</a>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Marketing Intern</h3>
              <p className="text-gray-600 text-sm mb-2">Paris | Internship</p>
              <p className="text-gray-700 text-sm">Assist with campaigns, social media, and content creation.</p>
            </div>
            <a href="mailto:jobs@flexishop.com?subject=Application%20for%20Marketing%20Intern" className="mt-4 md:mt-0 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-full transition">Apply</a>
          </div>
        </div>
      </div>
      <div className="text-center mt-12">
        <h2 className="text-xl font-bold text-pink-500 mb-2">Ready to join us?</h2>
        <a href="mailto:jobs@flexishop.com" className="bg-black hover:bg-zinc-800 text-white font-bold px-8 py-3 rounded-full transition">Send your application</a>
      </div>
    </div>
  );
} 