import { Link } from "react-router-dom";
import { FaLaptop, FaTshirt, FaMobileAlt, FaShippingFast, FaLock, FaSmile } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-0 px-0 text-center bg-gradient-to-b from-pink-50 via-white to-pink-100">
      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 text-white py-16 px-4 flex flex-col md:flex-row items-center justify-between mb-12 shadow-lg">
        <div className="flex-1 flex flex-col items-start md:items-start md:pl-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Bienvenue sur <span className="text-yellow-200">FlexiShop</span> !</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-xl drop-shadow">La boutique qui réunit le meilleur de la tech, de la mode et plus encore. Livraison rapide, paiement sécurisé, support 24/7.</p>
          <Link
            to="/products"
            className="bg-yellow-300 hover:bg-yellow-400 text-pink-900 font-bold rounded-full shadow px-10 py-4 text-xl transition duration-200"
          >
            Découvrir nos produits
          </Link>
        </div>
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img src="/vite.svg" alt="Hero" className="w-72 md:w-96 drop-shadow-2xl animate-bounce-slow" />
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="w-full max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-8">Nos univers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border border-pink-100">
            <FaLaptop className="text-5xl text-pink-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Informatique</h3>
            <p className="text-gray-500">Ordinateurs, accessoires, périphériques et plus.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border border-pink-100">
            <FaMobileAlt className="text-5xl text-pink-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Téléphonie</h3>
            <p className="text-gray-500">Smartphones, tablettes, objets connectés.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border border-pink-100">
            <FaTshirt className="text-5xl text-pink-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Mode</h3>
            <p className="text-gray-500">Vêtements, chaussures, accessoires tendance.</p>
          </div>
        </div>
      </section>

      {/* MEILLEURES VENTES */}
      <section className="w-full max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-8">Nos meilleures ventes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Sony Alpha 7 IV */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-yellow-100 hover:scale-105 transition-transform">
            <img src="https://d3d71ba2asa5oz.cloudfront.net/12008909/images/sona7m42870bk-uu_1.png" alt="Sony Alpha 7 IV" className="w-32 h-32 object-cover rounded-xl mb-4" />
            <h3 className="font-bold text-lg mb-2">Sony Alpha 7 IV</h3>
            <p className="text-pink-500 font-bold text-xl mb-2">1499 €</p>
            <p className="text-gray-500 text-sm mb-2">4K professional camera, interchangeable lenses, perfect for creators.</p>
            <Link to="/products" className="text-pink-600 hover:underline font-semibold">View product</Link>
          </div>
          {/* PlayStation 5 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-yellow-100 hover:scale-105 transition-transform">
            <img src="https://1pc.co.il/images/thumbs/0168383_-playstation-5-pro-digital-edition_510.jpeg" alt="PlayStation 5" className="w-32 h-32 object-cover rounded-xl mb-4" />
            <h3 className="font-bold text-lg mb-2">PlayStation 5</h3>
            <p className="text-pink-500 font-bold text-xl mb-2">549 €</p>
            <p className="text-gray-500 text-sm mb-2">Sony’s next-generation gaming console featuring ultra-fast SSD, ray tracing support, and the immersive DualSense controller.</p>
            <Link to="/products" className="text-pink-600 hover:underline font-semibold">View product</Link>
          </div>
          {/* MacBook Pro */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-yellow-100 hover:scale-105 transition-transform">
            <img src="https://i.ebayimg.com/images/g/RcUAAOSw5OtnYsCj/s-l1600.webp" alt="MacBook Pro" className="w-32 h-32 object-cover rounded-xl mb-4" />
            <h3 className="font-bold text-lg mb-2">MacBook Pro</h3>
            <p className="text-pink-500 font-bold text-xl mb-2">1199 €</p>
            <p className="text-gray-500 text-sm mb-2">Ultraportable, exceptional battery life, premium design.</p>
            <Link to="/products" className="text-pink-600 hover:underline font-semibold">View product</Link>
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="w-full max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-8">Nos partenaires</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-10" />
          {/* Apple logo with provided URL, no background */}
          <img src="https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png" alt="Apple" className="h-10" style={{ background: 'transparent' }} />
          {/* Adidas logo with provided URL, no background */}
          <img src="https://www.freepnglogos.com/uploads/adidas-logo-png-hd-17.png" alt="Adidas" className="h-10" style={{ background: 'transparent' }} />
        </div>
      </section>

      {/* Why Choose FlexiShop Section (améliorée) */}
      <section className="w-full max-w-none bg-white/80 rounded-2xl shadow p-8 mb-12 mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-500 mb-6">Pourquoi choisir FlexiShop ?</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <FaShippingFast className="text-3xl mb-2 text-pink-400" />
            <h3 className="font-semibold text-lg mb-1">Livraison rapide</h3>
            <p className="text-gray-500 text-center text-sm">Livraison offerte dès 50€ d'achat</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <FaLock className="text-3xl mb-2 text-pink-400" />
            <h3 className="font-semibold text-lg mb-1">Paiement sécurisé</h3>
            <p className="text-gray-500 text-center text-sm">Vos informations sont protégées</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <FaSmile className="text-3xl mb-2 text-pink-400" />
            <h3 className="font-semibold text-lg mb-1">Clients satisfaits</h3>
            <p className="text-gray-500 text-center text-sm">98% de satisfaction client</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section (améliorée) */}
      <section className="w-full py-16 px-4 bg-white rounded-2xl shadow mb-12 flex flex-col items-center max-w-none">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-3 text-center">Restez informé</h2>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          Recevez les nouveautés, offres exclusives et conseils shopping directement dans votre boîte mail !
        </p>
        <form className="flex flex-col sm:flex-row gap-4 w-full max-w-xl justify-center items-center">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 px-6 py-3 rounded-full bg-white border border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-pink-200 shadow"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-pink-400 hover:bg-pink-500 focus:ring-2 focus:ring-pink-200 text-white font-bold text-lg shadow transition"
          >
            S'abonner
          </button>
        </form>
        <p className="text-gray-500 text-sm mt-4">Désabonnement en un clic. Nous respectons votre vie privée.</p>
      </section>

      {/* User Reviews Section (déjà améliorée) */}
      <section className="w-full max-w-none bg-gradient-to-r from-pink-100 via-white to-pink-100 rounded-2xl shadow-2xl p-10 mb-12 flex flex-col items-center mt-16 border border-pink-200">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-pink-600 mb-10 tracking-tight drop-shadow">Avis de nos clients</h2>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
          {/* Review 1 */}
          <div className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center border border-pink-100 hover:scale-105 transition-transform">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Emily R." className="w-16 h-16 rounded-full mb-3 shadow" />
            <div className="flex gap-1 mb-2 text-yellow-400 text-2xl">★★★★★</div>
            <blockquote className="italic text-gray-700 text-center mb-3 text-lg">“Amazing shop! Fast delivery and great customer service. Highly recommend.”</blockquote>
            <span className="font-semibold text-pink-500">— Emily R.</span>
          </div>
          {/* Review 2 */}
          <div className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center border border-pink-100 hover:scale-105 transition-transform">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex T." className="w-16 h-16 rounded-full mb-3 shadow" />
            <div className="flex gap-1 mb-2 text-yellow-400 text-2xl">★★★★★</div>
            <blockquote className="italic text-gray-700 text-center mb-3 text-lg">“The products are top quality and the website is super easy to use.”</blockquote>
            <span className="font-semibold text-pink-500">— Alex T.</span>
          </div>
          {/* Review 3 */}
          <div className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center border border-pink-100 hover:scale-105 transition-transform">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Sarah L." className="w-16 h-16 rounded-full mb-3 shadow" />
            <div className="flex gap-1 mb-2 text-yellow-400 text-2xl">★★★★★</div>
            <blockquote className="italic text-gray-700 text-center mb-3 text-lg">“I love FlexiShop! I always find what I need and the support is fantastic.”</blockquote>
            <span className="font-semibold text-pink-500">— Sarah L.</span>
          </div>
        </div>
      </section>

      {/* FAQ RAPIDE */}
      <section className="w-full max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-8">Questions fréquentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">Quels sont les délais de livraison ?</h3>
            <p className="text-gray-500">La livraison standard prend 2 à 4 jours ouvrés. Express disponible.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">Comment puis-je suivre ma commande ?</h3>
            <p className="text-gray-500">Un lien de suivi est envoyé par email dès l’expédition.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">Quels moyens de paiement acceptez-vous ?</h3>
            <p className="text-gray-500">Carte bancaire, PayPal, Apple Pay, Google Pay.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-2">Puis-je retourner un produit ?</h3>
            <p className="text-gray-500">Oui, sous 14 jours après réception. Voir conditions sur la page Retours.</p>
          </div>
        </div>
      </section>
    </div>
  );
} 