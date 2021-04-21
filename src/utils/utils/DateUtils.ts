import { addZero } from './StringUtils';

export const stringifyTimeMS = (durationMs: number) => {
  const hours = durationMs / (1000 * 60 * 60);
  const absoluteHours = Math.floor(hours);

  //Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);

  //Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);

  return `${addZero(absoluteHours)}:${addZero(absoluteMinutes)}:${addZero(
    absoluteSeconds
  )}`;
};

export const hoursDiff = (fromDate: number, toDate: number) => {
  const durationMs = toDate - fromDate;
  const hours = durationMs / (1000 * 60 * 60);
  return Math.floor(hours);
};

export const daysDiff = (fromDate: number, toDate: number) => {
  const durationMs = toDate - fromDate;
  const hours = durationMs / (1000 * 60 * 60);
  return Math.floor(hours / 24);
};
