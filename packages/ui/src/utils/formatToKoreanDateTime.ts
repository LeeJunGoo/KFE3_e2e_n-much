export const formatToKoreanDateTime = (isoString: string | null): string | null => {
  if (!isoString) return null;

  const date = new Date(isoString);

  // ✨ options 변수가 Intl.DateTimeFormatOptions 타입임을 명시합니다.
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
    month: 'long', // OK: 'long'은 허용된 값 중 하나입니다.
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);

  return formatter.format(date);
};
