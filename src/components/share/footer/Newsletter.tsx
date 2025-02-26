import { aclonica } from "@/components/font/fonts";

const Newsletter = () => {
  return (
    <div>
      <h3
        className={`${aclonica.className}
                text-lg font-semibold mb-4`}
      >
        Newsletter
      </h3>
      <p className="text-gray-400 mb-4">
        Sign up for our newsletter to get the latest updates.
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
      />
      <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition">
        Subscribe
      </button>
    </div>
  );
};

export default Newsletter;
