export const formatToKoreanDateTime = (isoString: string | null): string | null => {
  if (!isoString) return null;

  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);

  return formatter.format(date);
};
