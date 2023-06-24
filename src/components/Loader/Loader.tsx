type LoaderProps = {
  isLoading: boolean;
  bgTransparent?: boolean;
};

export default function Loader({
  isLoading,
  bgTransparent = false,
}: LoaderProps) {
  return (
    <div
      className={`${
        isLoading ? "visible opacity-100" : "invisible opacity-0"
      } ${
        bgTransparent ? "bg-transparent" : "bg-gray-white "
      } fixed top-0 w-full h-full flex justify-center items-center transition-all`}
    >
      <span
        className="inline-block w-10 h-10 rounded-full border-t-4 border-t-orange-500
          border-r-4 border-r-transparent animate-rotate"
      ></span>
    </div>
  );
}
