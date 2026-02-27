import { SVGProps } from 'react';

export default function MwangazaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3V6" />
      <path d="M12 18V21" />
      <path d="M6.34299 6.34302L8.46499 8.46502" />
      <path d="M15.535 15.535L17.657 17.657" />
      <path d="M3 12H6" />
      <path d="M18 12H21" />
      <path d="M6.34299 17.657L8.46499 15.535" />
      <path d="M15.535 8.46502L17.657 6.34302" />
      <path d="M12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8Z" />
    </svg>
  );
}
