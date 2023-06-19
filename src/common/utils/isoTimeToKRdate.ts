const isoTimeToKRdate = (isoString: string) => {
  // ISO 8601 문자열을 Date 객체로 변환
  const dateObj = new Date(isoString);

  // 한국 시간 정보 추출
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  // 한국 시간 출력 형식 (예: 2023-06-19 14:31:51)
  const koreaTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return koreaTime;
};

export default isoTimeToKRdate;
