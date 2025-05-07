export default function AuthFormWrapper({ title, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
