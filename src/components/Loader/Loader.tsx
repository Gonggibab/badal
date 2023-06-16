type LoaderProps = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <div
      className={`${
        isLoading ? "visible opacity-80" : "invisible opacity-0"
      } fixed top-0 w-full h-full flex justify-center items-center 
       bg-gray-200 transition-all`}
    >
      <span
        className="inline-block w-10 h-10 rounded-full border-t-4 border-t-orange-500
          border-r-4 border-r-transparent animate-rotate"
      ></span>
    </div>
  );
}
