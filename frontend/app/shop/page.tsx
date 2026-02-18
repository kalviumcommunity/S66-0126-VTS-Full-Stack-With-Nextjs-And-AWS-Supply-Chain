export const revalidate = 60;

import ProductCard from "@/components/ProductCard";

export default function Shop() {

  const products = [
    {
      title: "Tribal Mask",
      price: "$150.00",
      image: "/images/mask.png",
    },
    {
      title: "Wooden Sculpture",
      price: "$250.00",
      image: "/images/sculpture.png",
    },
    {
      title: "Tribal Painting",
      price: "$200.00",
      image: "/images/painting.png",
    },
    {
      title: "Handcrafted Drum",
      price: "$180.00",
      image: "/images/drum.png",
    },
    {
      title: "Decorative Shield",
      price: "$220.00",
      image: "/images/shield.png",
    },
    {
      title: "Tribal Necklace",
      price: "$130.00",
      image: "/images/necklace.png",
    },
  ];

  return (
    <div className="bg-white-100 min-h-screen px-12 py-16">

      <div className="grid md:grid-cols-3 gap-10">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>

    </div>
  );
}
