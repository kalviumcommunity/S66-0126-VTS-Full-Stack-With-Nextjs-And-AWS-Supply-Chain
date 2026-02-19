import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function UserPage({ params }: Props) {
  const { id } = params;
  if (!id) return notFound();

  return (
    <div>
      <h2 className="text-2xl font-bold">User ID: {id}</h2>
      <p className="text-gray-700">This page demonstrates a dynamic route for user ID.</p>
    </div>
  );
}
