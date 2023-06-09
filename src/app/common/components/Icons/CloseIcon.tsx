type CloseIconProps = {
  size: number;
  color?: string;
};

export default function CloseIcon({ size, color }: CloseIconProps) {
  return (
    <svg
      className={`text-inherit ${color} h-${size} w-${size} flex-shrink-0`}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
