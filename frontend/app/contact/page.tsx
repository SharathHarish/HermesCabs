export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-amber-500">Contact Us</h1>

      <p className="mt-4 text-gray-700 text-lg">
        Have any questions, need support, or want to book a ride?  
        Our team is here to help you anytime.
      </p>

      <div className="mt-8 space-y-4 text-lg text-gray-700">
        <p>📞 <strong>Phone:</strong> +91 98765 43210</p>
        <p>📧 <strong>Email:</strong> support@hermescabs.com</p>
        <p>📍 <strong>Location:</strong> South India (Operating across all major cities)</p>
      </div>

      <h2 className="mt-10 text-2xl font-semibold text-gray-900">Get in Touch</h2>

      <form className="mt-6 space-y-4">
        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Your Name"
        />
        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Email Address"
        />
        <textarea
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Message"
          rows={5}
        ></textarea>

        <button className="bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-600">
          Send Message
        </button>
      </form>
    </div>
  );
}
