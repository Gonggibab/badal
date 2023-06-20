import { Dispatch, SetStateAction, useEffect } from "react";

type NotificationProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  content: string;
  btnTitle: string;
  callback: () => void;
};

export default function Notification({
  isOpen,
  setIsOpen,
  content,
  btnTitle,
  callback,
}: NotificationProps) {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      className={`${
        isOpen ? "visible opacity-90" : "invisible opacity-0"
      } fixed bottom-10 z-50 ease-out duration-300`}
      id="notification-undo"
      role="alert"
    >
      <div className="flex items-center w-full max-w-lg px-6 py-4 bg-white rounded-lg shadow-lg">
        <div className="text-sm font-semibold text-gray-900">{content}</div>
        {btnTitle !== "" && (
          <div className="flex items-center ml-auto space-x-2">
            <button
              role="button"
              className="ml-2 p-1.5 text-sm font-semibold text-blue-600 
                rounded-lg hover:text-blue-400 "
              onClick={callback}
            >
              {btnTitle}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
