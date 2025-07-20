import { useState } from "react";

export default function AddProductForm({ onProductAdded }: { onProductAdded: (product: any) => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8000/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          image_url,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Erreur ajout produit");
      onProductAdded(data);
    } catch (err: any) {
      alert(err.message || "Erreur ajout produit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded bg-white space-y-4">
      <div>
        <label className="block mb-1 font-medium">Nom</label>
        <input className="border p-2 w-full" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea className="border p-2 w-full" value={description} onChange={e => setDescription(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Prix</label>
        <input className="border p-2 w-full" type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input className="border p-2 w-full" value={image_url} onChange={e => setImageUrl(e.target.value)} />
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
} 