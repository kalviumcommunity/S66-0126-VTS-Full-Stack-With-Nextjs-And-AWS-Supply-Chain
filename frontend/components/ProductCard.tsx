interface Props {
  title: string;
  price: string;
}

export default function ProductCard({ title, price }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="h-40 bg-gray-300 rounded-lg mb-4">
        {/* ADD IMAGE HERE
        <img src="/images/mask.jpg" className="h-40 w-full object-cover rounded-lg" />
        */}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{price}</p>
    </div>
  );
}
