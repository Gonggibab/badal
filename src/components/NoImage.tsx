import NoCameraIcon from "assets/icon/noCamera.svg";

export default function NoImage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <NoCameraIcon className="mb-2 w-10 h-10 text-gray-400" />
      <span className="font-bold text-gray-400">이미지 없음</span>
    </div>
  );
}
