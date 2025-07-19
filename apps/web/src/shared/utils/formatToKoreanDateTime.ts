const TWO_DIGITS = 2;
type DateFormatType = 'YYYY-MM-DD' | 'MM-DD' | 'YYYY년 MM월 DD일' | 'M월 D일';

export const formatKoreanDate = (isoString: string | null, dateFormat: DateFormatType): string | null => {
  if (!isoString) return null;

  const date = new Date(isoString);
  // 한국 시간대로 변환
  const koreanDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  const year = koreanDate.getFullYear();
  const month = koreanDate.getMonth() + 1;
  const day = koreanDate.getDate();

  const MM = String(month).padStart(TWO_DIGITS, '0');
  const DD = String(day).padStart(TWO_DIGITS, '0');

  // 날짜 포맷팅
  switch (dateFormat) {
    case 'YYYY-MM-DD':
      return `${year}-${MM}-${DD}`;
    case 'MM-DD':
      return `${MM}-${DD}`;
    case 'YYYY년 MM월 DD일':
      return `${year}년 ${MM}월 ${DD}일`;
    case 'M월 D일':
      return `${month}월 ${day}일`;
    default:
      return `${year}-${MM}-${DD}`;
  }
};

export const formatYYYYMMDD = (isoString: string | null) => formatKoreanDate(isoString, 'YYYY-MM-DD');
export const formatMMDD = (isoString: string | null) => formatKoreanDate(isoString, 'MM-DD');
export const formatKoreanFullDate = (isoString: string | null) => formatKoreanDate(isoString, 'YYYY년 MM월 DD일');
export const formatKoreanShortDate = (isoString: string | null) => formatKoreanDate(isoString, 'M월 D일');

// NOTE - 사용 예시
/*
const exampleDate = '2025-05-05T14:30:00.000Z';

console.log('=== 4가지 날짜 형식 ===');
console.log(formatYYYYMMDD(exampleDate)); // "2025-05-05"
console.log(formatMMDD(exampleDate)); // "05-05"
console.log(formatKoreanFullDate(exampleDate)); // "2025년 05월 05일"
console.log(formatKoreanShortDate(exampleDate)); // "5월 5일"

console.log(formatKoreanDate(exampleDate, 'YYYY-MM-DD')); // "2025-05-05"
console.log(formatKoreanDate(exampleDate, 'M월 D일')); // "5월 5일"
*/
