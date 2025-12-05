export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-4 text-gray-600">Your ride has been confirmed.</p>

      <a href="/dashboard" className="mt-6 px-6 py-3 bg-black text-white rounded-lg">
        Go to Dashboard
      </a>
    </div>
  );
}
