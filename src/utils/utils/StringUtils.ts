/* eslint-disable no-bitwise */
export const addZero = (n: number) => `${n}`.padStart(2, '0');

export const newUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const stringifyNumber = (num: number, maxDecimals = 1) => {
  if (Math.round(num) !== num) {
    return num.toFixed(maxDecimals);
  }
  return num + '';
};
