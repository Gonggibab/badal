import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { notificationAtom } from "common/recoil/atom";

export default function Notification() {
  const [notification, setNotification] = useRecoilState(notificationAtom);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (notification.isOpen) {
      timer = setTimeout(() => {
        setNotification({ ...notification, isOpen: false });
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification.isOpen]);

  return (
    <div
      className={`${
        notification.isOpen ? "visible opacity-90" : "invisible opacity-0"
      } z-50 fixed bottom-10 w-full flex justify-center ease-out duration-300`}
      id="notification-undo"
      role="alert"
    >
      <div className="flex items-center max-w-lg px-6 py-4 bg-white rounded-lg shadow-lg">
        <div className="text-sm font-semibold text-gray-900">
          {notification.content}
        </div>
        {notification.btnTitle && (
          <div className="flex items-center ml-auto space-x-2">
            <button
              role="button"
              className="ml-2 p-1.5 text-sm font-semibold text-blue-600 
                rounded-lg hover:text-blue-400 "
              onClick={notification.callback}
            >
              {notification.btnTitle}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
