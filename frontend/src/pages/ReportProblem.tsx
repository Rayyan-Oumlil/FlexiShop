export default function ReportProblem() {
  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4 text-pink-500">Report a Problem</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Your Email</label>
          <input type="email" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Describe the problem</label>
          <textarea className="w-full border rounded px-3 py-2" rows={5} required></textarea>
        </div>
        <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded">Send</button>
      </form>
    </div>
  );
} 