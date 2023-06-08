type MenuBtnProps = {
  width: number;
  height: number;
  onClick?: () => void;
};

export default function MenuBtn({ width, height, onClick }: MenuBtnProps) {
  return (
    <button
      type="button"
      className="relative inline-flex items-center justify-center text-inherit"
      onClick={onClick}
    >
      <span className="sr-only">Open menu</span>
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <path fill="none" d="M0 0h20v20H0z" />
        <path d="M3 9.25h14v1.5H3zM3 3h14v1.5H3zM3 15.5h14V17H3z" />
      </svg>
    </button>
  );
}
