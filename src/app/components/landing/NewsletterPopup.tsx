// components/NewsletterPopup.tsx
import React from "react";

interface NewsletterPopupProps {
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    alert(
      `Thanks for subscribing with ${email}! You'll receive job application tips soon.`
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-8 right-8 bg-white p-8 rounded-2xl shadow-2xl max-w-sm z-50 transition-all duration-500 ${
        isVisible
          ? "transform translate-y-0 opacity-100"
          : "transform translate-y-24 opacity-0"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
      <h3 className="text-slate-800 font-semibold mb-2">
        Get Job Application Tips
      </h3>
      <p className="text-gray-600 text-sm mb-5">
        Subscribe and never miss a chance to improve your job hunt with AI.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded-full font-semibold hover:bg-blue-700"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterPopup;
