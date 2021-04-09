import { addZero } from './StringUtils';

export const stringifyTimeMS = (durationMs: number) => {
  const seconds = Math.floor((durationMs / 1000) % 60),
    minutes = Math.floor((durationMs / (1000 * 60)) % 60),
    hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);
  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};
