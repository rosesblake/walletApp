export default function ErrorAlert({ message }) {
  if (!message) return null;

  return (
    <div className="mb-5 w-full rounded-md bg-red-100 border border-red-300 px-4 py-2 text-sm text-red-800 shadow-sm">
      {message}
    </div>
  );
}
