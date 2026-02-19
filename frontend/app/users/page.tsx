import Link from "next/link";

export default function UsersPage() {
  const users = [{ id: "1" }, { id: "2" }, { id: "3" }];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((u) => (
          <li key={u.id}>
            <Link href={`/users/${u.id}`} className="text-indigo-600 hover:underline">
              View User {u.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
