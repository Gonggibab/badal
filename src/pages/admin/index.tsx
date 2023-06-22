export default function Admin() {
  return (
    <main className="p-4 md:ml-64">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center justify-center h-64 rounded bg-gray-200">
          <p className="text-lg text-gray-400">매출액</p>
        </div>
        <div className="flex items-center justify-center h-64 rounded bg-gray-200">
          <p className="text-lg text-gray-400">유저 변화</p>
        </div>
        <div className="flex items-center justify-center h-64 rounded bg-gray-200">
          <p className="text-lg text-gray-400">가장 많이 팔리는 제품</p>
        </div>
        <div className="flex items-center justify-center h-64 rounded bg-gray-200">
          <p className="text-lg text-gray-400">제품 별 판매량</p>
        </div>
      </div>
    </main>
  );
}
