import { BreakSlot } from "./parse";

export const overlapsBreak = (
  breaks: BreakSlot[],
  start: Date,
  end: Date
): boolean => {
  return breaks.some((b) => {
    return start < b.end && end > b.start;
  });
};

const padBelowTen = (n: number): string => {
  return n < 10 ? `0${n}` : `${n}`;
};

export const getDate = (date: Date): string => {
  return `${date.getFullYear()}-${padBelowTen(date.getMonth())}-${padBelowTen(
    date.getDate()
  )}`;
};

export const getTime = (date: Date): string => {
  return `${padBelowTen(date.getHours())}:${padBelowTen(date.getMinutes())}`;
};
