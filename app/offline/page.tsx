export default function Offline() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      <div className="text-center p-8">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">You're Offline</h1>
        <p className="text-xl text-blue-200 mb-8">
          Please check your internet connection to continue browsing.
        </p>
        <p className="text-blue-300">
          Some cached content may still be available.
        </p>
      </div>
    </div>
  );
}
