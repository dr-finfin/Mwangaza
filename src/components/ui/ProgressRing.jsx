import React, { useEffect, useRef } from 'react';

const ProgressRing = ({
  percentage = 0,
  size = 80,
  strokeWidth = 6,
  color = '#1a56db',
  bgColor = '#e5e7eb',
  children,
  animate = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const circleRef = useRef(null);

  useEffect(() => {
    if (!circleRef.current || !animate) return;
    circleRef.current.style.strokeDashoffset = circumference;
    const timer = setTimeout(() => {
      if (circleRef.current) {
        circleRef.current.style.transition =
          'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        circleRef.current.style.strokeDashoffset = offset;
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [percentage, offset, circumference, animate]);

  return (
    <div
      className="progress-ring-container"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? circumference : offset}
          style={!animate ? { strokeDashoffset: offset } : {}}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ProgressRing;
