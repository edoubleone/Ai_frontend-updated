import { useState, useEffect } from "react";

interface CookieConsentProps {
  policyLink?: string;
}

export default function CookieConsent({
  policyLink = "#",
}: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setShowBanner(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };
  const rejectCookies = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-5 z-40 right-0 left-0 md:right-5 md:left-5 sm:left-auto sm:right-5 max-w-md w-full bg-white border border-gray-300 rounded-xl shadow-lg p-5">
      <button
        onClick={() => setShowBanner(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>

      <h2 className="text-lg font-semibold flex items-center gap-2">
        We use cookies <span>🍪</span>
      </h2>

      <p className="text-sm text-gray-600 mt-2">
        To improve your experience, provide personalized content, analyze
        website traffic, and display targeted advertisements. By clicking
        “Accept All,” you agree to our use of cookies. You can change your
        preferences by selecting
        <a
          href={policyLink}
          className="text-blue-600 underline hover:text-blue-800"
        >
          To find out more, read our cookie policy.
        </a>
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <button
          onClick={acceptCookies}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Accept All Cookies
        </button>
        <button
          onClick={rejectCookies}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Reject Cookies
        </button>
      </div>
    </div>
  );
}
