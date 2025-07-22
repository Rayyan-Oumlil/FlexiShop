import { Link } from "react-router-dom";
import { FaLaptop, FaTshirt, FaMobileAlt, FaShippingFast, FaLock, FaSmile, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-0 px-0 text-center bg-gradient-to-b from-pink-50 via-white to-pink-100">
      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 text-white py-16 px-4 flex flex-col md:flex-row items-center justify-between mb-12 shadow-lg">
        <div className="flex-1 flex flex-col items-start md:items-start md:pl-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Bienvenue sur <span className="text-yellow-200">MyStore</span> !</h1>
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
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-yellow-100 hover:scale-105 transition-transform">
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" alt="Laptop" className="w-32 h-32 object-cover rounded-xl mb-4" />
            <h3 className="font-bold text-lg mb-2">Laptop Pro 15"</h3>
            <p className="text-pink-500 font-bold text-xl mb-2">999 €</p>
            <p className="text-gray-500 text-sm mb-2">Puissant, léger, parfait pour le travail et le loisir.</p>
            <Link to="/products" className="text-pink-600 hover:underline font-semibold">Voir le produit</Link>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-yellow-100 hover:scale-105 transition-transform">
            <img src="https://images.unsplash.com/photo-1512499617640-c2f999098c67?auto=format&fit=crop&w=400&q=80" alt="Smartphone" className="w-32 h-32 object-cover rounded-xl mb-4" />
            <h3 className="font-bold text-lg mb-2">Smartphone X</h3>
            <p className="text-pink-500 font-bold text-xl mb-2">699 €</p>
            <p className="text-gray-500 text-sm mb-2">Écran OLED, autonomie record, design élégant.</p>
            <Link to="/products" className="text-pink-600 hover:underline font-semibold">Voir le produit</Link>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-yellow-100 hover:scale-105 transition-transform">
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" alt="Sneakers" className="w-32 h-32 object-cover rounded-xl mb-4" />
            <h3 className="font-bold text-lg mb-2">Sneakers Air</h3>
            <p className="text-pink-500 font-bold text-xl mb-2">129 €</p>
            <p className="text-gray-500 text-sm mb-2">Confort ultime, look moderne, édition limitée.</p>
            <Link to="/products" className="text-pink-600 hover:underline font-semibold">Voir le produit</Link>
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Apple_logo_black.svg" alt="Apple" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Adidas_Logo.svg" alt="Adidas" className="h-10" />
        </div>
      </section>

      {/* Why Choose MonShop Section (améliorée) */}
      <section className="w-full max-w-none bg-white/80 rounded-2xl shadow p-8 mb-12 mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-500 mb-6">Pourquoi choisir MyStore ?</h2>
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
            <blockquote className="italic text-gray-700 text-center mb-3 text-lg">“I love MyStore! I always find what I need and the support is fantastic.”</blockquote>
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

      {/* FOOTER ENRICHI */}
      <footer className="w-full bg-pink-600 text-white py-8 mt-12 flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl px-4 gap-8">
          <div className="flex-1 text-left">
            <h3 className="font-bold text-xl mb-2">MyStore</h3>
            <p className="text-pink-100 mb-2">Votre boutique de confiance pour la tech, la mode et plus encore.</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-yellow-200"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-yellow-200"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-yellow-200"><FaTwitter size={24} /></a>
            </div>
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-semibold mb-2">Liens utiles</h4>
            <ul className="space-y-1">
              <li><Link to="/products" className="hover:underline">Produits</Link></li>
              <li><Link to="/cart" className="hover:underline">Panier</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/about" className="hover:underline">À propos</Link></li>
              <li><Link to="/report-problem" className="hover:underline">Signaler un problème</Link></li>
            </ul>
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="mb-1">contact@mystore.com</p>
            <p>+33 1 23 45 67 89</p>
          </div>
        </div>
        <div className="mt-8 text-pink-100 text-sm">&copy; {new Date().getFullYear()} MyStore. Tous droits réservés.</div>
      </footer>
    </div>
  );
} 