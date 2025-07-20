import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-pink-600">Welcome to MyStore!</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
        Discover our selection of tech, fashion, and more. Fast delivery, secure payment, 24/7 support. Treat yourself today!
      </p>
      <Link
        to="/products"
        className="bg-pink-400 hover:bg-pink-500 focus:ring-2 focus:ring-pink-200 text-white font-bold rounded-full shadow px-8 py-3 text-lg transition duration-200"
      >
        Voir les produits
      </Link>

      {/* Why Choose MonShop Section */}
      <section className="w-full max-w-none bg-white/80 rounded-2xl shadow p-8 mb-12 mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-500 mb-6">Why Choose MyStore?</h2>
        <p className="text-center text-gray-600 mb-8">We're committed to providing you with the best shopping experience</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🚚</span>
            <h3 className="font-semibold text-lg mb-1">Free Shipping</h3>
            <p className="text-gray-500 text-center text-sm">Free delivery on orders over $50</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🔒</span>
            <h3 className="font-semibold text-lg mb-1">Secure Payment</h3>
            <p className="text-gray-500 text-center text-sm">Your payment information is safe</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">💙</span>
            <h3 className="font-semibold text-lg mb-1">Customer Love</h3>
            <p className="text-gray-500 text-center text-sm">98% customer satisfaction rate</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16 px-4 bg-white rounded-2xl shadow mb-12 flex flex-col items-center max-w-none">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-3 text-center">Stay in the Loop</h2>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          Get the latest products, exclusive offers, and shopping tips delivered to your inbox
        </p>
        <form className="flex flex-col sm:flex-row gap-4 w-full max-w-xl justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-full bg-white border border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 shadow"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-pink-400 hover:bg-pink-500 focus:ring-2 focus:ring-pink-200 text-white font-bold text-lg shadow transition"
          >
            Subscribe
          </button>
        </form>
        <p className="text-gray-500 text-sm mt-4">No spam, unsubscribe anytime. We respect your privacy.</p>
      </section>

      {/* User Reviews Section */}
      <section className="w-full max-w-4xl mx-auto bg-white/80 rounded-2xl shadow p-8 mb-12 flex flex-col items-center mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-500 mb-6">User Reviews</h2>
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
          {/* Review 1 */}
          <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="flex gap-1 mb-2 text-yellow-400 text-lg">★★★★★</div>
            <p className="text-gray-700 text-center mb-2">“Amazing shop! Fast delivery and great customer service. Highly recommend.”</p>
            <span className="font-semibold text-pink-500">— Emily R.</span>
          </div>
          {/* Review 2 */}
          <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="flex gap-1 mb-2 text-yellow-400 text-lg">★★★★★</div>
            <p className="text-gray-700 text-center mb-2">“The products are top quality and the website is super easy to use.”</p>
            <span className="font-semibold text-pink-500">— Alex T.</span>
          </div>
          {/* Review 3 */}
          <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="flex gap-1 mb-2 text-yellow-400 text-lg">★★★★★</div>
            <p className="text-gray-700 text-center mb-2">“I love MyStore! I always find what I need and the support is fantastic.”</p>
            <span className="font-semibold text-pink-500">— Sarah L.</span>
          </div>
        </div>
      </section>
    </div>
  );
} 