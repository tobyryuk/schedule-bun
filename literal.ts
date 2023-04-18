import parse from "./parse";
import { overlapsBreak, getDate, getTime } from "./helpers";

const handle = (path: string) => {
  const schedules = parse(path);
  const slots: string[] = [];

  for (const schedule of schedules) {
    let current = schedule.start;

    while (current < schedule.end) {
      const end = new Date(current);
      end.setMinutes(end.getMinutes() + 15);

      if (!overlapsBreak(schedule.breaks, current, end)) {
        slots.push(
          `${getDate(current)} ${getTime(current)} - ${getTime(end)} ${
            schedule.employeeName
          }`
        );
      }

      current = end;
    }
  }

  return slots.sort();
};

export default handle;
