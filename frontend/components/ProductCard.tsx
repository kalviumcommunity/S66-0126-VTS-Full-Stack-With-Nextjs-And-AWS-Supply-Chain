interface Props {
  title: string;
  price: string;
  image: string;
}

export default function ProductCard({ title, price, image }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">

      <div className="h-56 bg-white-100 rounded-lg mb-4 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="max-h-full object-contain"
          style={{ filter: 'invert(0)' }}
        />
      </div>

      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{price}</p>
    </div>
  );
}
