import React, { useEffect, useState } from "react";

export default function Notification({
  message,
  type = "info",
  duration = 4000,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible || !message) return null;

  const typeClasses = {
    msg: "bg-green-500",
  };

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 text-white px-6 py-3 rounded-md shadow-lg transition-opacity duration-500 ${
        typeClasses[type] || typeClasses.info
      }`}
    >
      {message}
    </div>
  );
}
