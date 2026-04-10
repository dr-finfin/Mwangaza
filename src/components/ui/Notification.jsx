import React, { useEffect, useState } from 'react';

const ICONS = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
};

const STYLES = {
  success: 'bg-emerald-600 text-white shadow-emerald-500/30',
  error: 'bg-red-600 text-white shadow-red-500/30',
  info: 'bg-blue-600 text-white shadow-blue-500/30',
  warning: 'bg-gold-500 text-white shadow-gold-500/30',
};

const Notification = ({ notification }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!notification) {
      setShow(false);
      return;
    }
    // Trigger entrance animation
    const t1 = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(t1);
  }, [notification]);

  if (!notification) return null;

  const type = notification.type || 'info';

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[200] flex items-center gap-2.5 
                  px-5 py-3 rounded-2xl shadow-2xl font-semibold text-sm
                  transition-all duration-300 ease-out
                  ${STYLES[type]}
                  ${
                    show
                      ? '-translate-x-1/2 translate-y-0 opacity-100'
                      : '-translate-x-1/2 translate-y-4 opacity-0'
                  }`}
    >
      <span className="text-base">{ICONS[type]}</span>
      <span>{notification.message}</span>
    </div>
  );
};

export default Notification;
