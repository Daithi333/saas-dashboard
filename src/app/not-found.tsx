import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-semibold text-gray-900">404</h1>
      <p className="mt-2 text-gray-600">
        The page or resource you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
