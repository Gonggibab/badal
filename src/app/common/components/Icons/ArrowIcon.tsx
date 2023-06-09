type ArrowIconProps = {
  size: number;
  color?: string;
};

export default function ArrowIcon({ size, color }: ArrowIconProps) {
  return (
    <svg
      className={`text-inherit ${color} h-${size} w-${size} flex-shrink-0`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M10.586 6.343L12 4.93 19.071 12 12 19.071l-1.414-1.414L16.243 12l-5.657-5.657z"
      />
    </svg>
  );
}
