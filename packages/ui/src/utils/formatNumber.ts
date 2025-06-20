// 숫자 포맷팅 함수 (예: 10000 -> 10,000)
export const formatNumber = (num: number | null) => {
  if (!num) return;
  return new Intl.NumberFormat('ko-KR').format(num);
};
