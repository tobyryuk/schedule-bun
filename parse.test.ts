import { expect, test } from "bun:test";
import parse from "./parse";

test("parsing returns a structured version", () => {
  const result = parse("./fixtures/singular.json");

  expect(result).toEqual([
    {
      scheduleId: 4711,
      employeeId: 4712,
      employeeName: "John Doe",
      start: new Date("2020-04-29T08:00:00.000Z"),
      end: new Date("2020-04-29T12:30:00.000Z"),
      breaks: [
        {
          start: new Date("2020-04-29T10:00:00.000Z"),
          end: new Date("2020-04-29T10:30:00.000Z"),
        },
      ],
    },
  ]);
});

test("parsing structures and filters breaks as Date", () => {
  const result = parse("./fixtures/singular.json");

  expect(result[0].breaks.length).toEqual(1);
  expect(result[0].breaks[0].start).toBeInstanceOf(Date);
  expect(result[0].breaks[0].end).toBeInstanceOf(Date);
});

// Quick helper to correct the timezone offset
function offset(date: Date) {
  const toOffset = date.getTimezoneOffset();
  return new Date(date.getTime() - toOffset * 60 * 1000)
    .toISOString()
    .split("T");
}

test("parsing structures start and end as Date", () => {
  const result = parse("./fixtures/singular.json");

  expect(result[0].start).toBeInstanceOf(Date);
  expect(result[0].end).toBeInstanceOf(Date);

  const start = offset(result[0].start);
  const end = offset(result[0].end);
  expect(start[0]).toEqual("2020-04-29");
  expect(start[1].split(".")[0]).toEqual("10:00:00");
  expect(end[0]).toEqual("2020-04-29");
  expect(end[1].split(".")[0]).toEqual("14:30:00");
});
