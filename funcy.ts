import parse, { Schedule } from "./parse";
import { overlapsBreak, getDate, getTime } from "./helpers";

type Slot = {
  start: Date;
  end: Date;
};

type Availability = {
  employeeId: number;
  employeeName: string;
  scheduleId: number;
  slots: Slot[];
};

const getScheduleSlots = (schedule: Schedule): Slot[] => {
  const slots: Slot[] = [];

  let current = schedule.start;

  while (current < schedule.end) {
    const end = new Date(current);
    end.setMinutes(end.getMinutes() + 15);

    if (!overlapsBreak(schedule.breaks, current, end)) {
      slots.push({
        start: current,
        end,
      });
    }

    current = end;
  }

  return slots;
};

const getAvailabilitySlots = (availability: Availability[]): Array<string> => {
  return availability
    .map((a) =>
      a.slots.map(
        (s) =>
          `${getDate(s.start)} ${getTime(s.start)} - ${getTime(s.end)} ${
            a.employeeName
          }`
      )
    )
    .flat()
    .sort();
};

const handle = (path: string) => {
  const schedules = parse(path);
  const availability: Availability[] = [];

  for (const schedule of schedules) {
    availability.push({
      employeeId: schedule.employeeId,
      employeeName: schedule.employeeName,
      scheduleId: schedule.scheduleId,
      slots: getScheduleSlots(schedule),
    });
  }

  return getAvailabilitySlots(availability);
};

export default handle;
