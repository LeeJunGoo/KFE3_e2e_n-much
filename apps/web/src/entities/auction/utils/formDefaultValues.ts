import { getNowKorDate, getTime, getTomorrowDate } from 'src/shared/utils/dateFns';
import { MIN_MAX_POINT_NUM, MIN_STARTING_POINT_NUM } from '../constants';

export const getFormDefaultValues = () => {
  const korToday = getNowKorDate();
  const endDay = getTomorrowDate(korToday);
  const endTime = getTime(endDay);

  return {
    title: '',
    description: '',
    endDay,
    endTime,
    startingPoint: String(MIN_STARTING_POINT_NUM),
    maxPoint: String(MIN_MAX_POINT_NUM)
  };
};
