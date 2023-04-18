import { readFileSync } from "fs";

export type BreakSlot = {
  start: Date;
  end: Date;
};

export interface Schedule {
  scheduleId: number;
  employeeId: number;
  employeeName: string;
  start: Date;
  end: Date;
  breaks: BreakSlot[];
}

const read = (path: string): IndividualScheduleResponse[] => {
  const content = readFileSync(path, "utf8");
  return JSON.parse(content) as IndividualScheduleResponse[];
};

const transformBreaks = (s: IndividualScheduleResponse): BreakSlot[] => {
  const breaks: BreakSlot[] = [];

  for (const i in Array.from(Array(4))) {
    const suffix = parseInt(i) + 1 === 1 ? "" : parseInt(i) + 1 + "";

    if (
      s[`startBreak${suffix}`] === "00:00:00" ||
      s[`endBreak${suffix}`] === "00:00:00"
    ) {
      continue;
    }

    const start = new Date(`${s.startDate}T${s[`startBreak${suffix}`]}`);
    const end = new Date(`${s.startDate}T${s[`endBreak${suffix}`]}`);

    if (start && end) {
      breaks.push({ start, end });
    }
  }

  return breaks;
};

const transform = (schedules: IndividualScheduleResponse[]): Schedule[] => {
  return schedules.map((s) => ({
    scheduleId: s.scheduleId,
    employeeId: s.employeeId,
    employeeName: s.employeeName,
    start: new Date(`${s.startDate}T${s.startTime}`),
    end: new Date(`${s.endDate}T${s.endTime}`),
    breaks: transformBreaks(s),
  }));
};

export default (path: string): Schedule[] => {
  const schedules = read(path);
  return transform(schedules);
};
