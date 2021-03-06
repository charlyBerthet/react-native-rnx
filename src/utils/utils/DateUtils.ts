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

export const hoursDiff = (
  fromDate: number,
  toDate: number,
  notRounded?: boolean
) => {
  const durationMs = toDate - fromDate;
  const hours = durationMs / (1000 * 60 * 60);
  return notRounded ? hours : Math.floor(hours);
};

export const daysDiff = (
  fromDate: number,
  toDate: number,
  notRounded?: boolean
) => {
  const durationMs = toDate - fromDate;
  const hours = durationMs / (1000 * 60 * 60);
  const days = hours / 24;
  return notRounded ? days : Math.floor(days);
};
export const hoursToDays = (hours: number) => Math.round(hours / 24);
export const daysToHours = (days: number) => Math.round(days * 24);
export const msToDays = (ms: number, rounded = true, decimal = 0) => {
  const res = ms / 1000 / 60 / 60 / 24;
  return rounded
    ? Math.round(res * Math.pow(10, decimal)) / Math.pow(10, decimal)
    : res;
};
export const msToHours = (ms: number) => Math.round(ms / 1000 / 60 / 60);
export const hoursToMs = (hours: number) => hours * 60 * 60 * 1000;

export const isSameDay = (a: number, b: number) => {
  const dA = new Date(a);
  const dB = new Date(b);
  return (
    dA.getDate() === dB.getDate() &&
    dA.getMonth() === dB.getMonth() &&
    dA.getFullYear() === dB.getFullYear()
  );
};

export const isSameMonth = (a: number, b: number) => {
  const dA = new Date(a);
  const dB = new Date(b);
  return (
    dA.getMonth() === dB.getMonth() && dA.getFullYear() === dB.getFullYear()
  );
};

export const resetTime = (timestamp: number) => {
  const date = new Date(timestamp);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};
