type MenuIconProps = {
  width: number;
  height: number;
  color?: string;
};

export default function MenuIcon({ width, height, color }: MenuIconProps) {
  return (
    <svg
      className={`text-inherit ${color} w-[${width}px] h-[${height}px] flex-shrink-0`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path fill="none" d="M0 0h20v20H0z" />
      <path d="M3 9.25h14v1.5H3zM3 3h14v1.5H3zM3 15.5h14V17H3z" />
    </svg>
  );
}
