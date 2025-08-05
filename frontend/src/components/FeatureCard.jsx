export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gradient-to-r from-green-100 via-green-200 to-green-300 rounded-2xl shadow p-6 text-center border hover:shadow-lg transition-all">
      <div className="text-green-600 mb-4 flex justify-center">{icon}</div>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
