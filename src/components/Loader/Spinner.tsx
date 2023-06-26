type SpinnerProps = {
  isLoading: boolean;
};

export default function Spinner({ isLoading }: SpinnerProps) {
  return (
    <div
      className={`${
        isLoading ? "visible opacity-100" : "invisible opacity-0"
      } absolute top-0 w-full h-full flex justify-center items-center transition-all`}
    >
      <span
        className="inline-block w-10 h-10 rounded-full animate-rotate
          border-t-2 border-t-orange-500 border-r-2 border-r-transparent"
      ></span>
    </div>
  );
}
