const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

const addMinutes = (date, time, minutes) => {
  const [Y, M, D] = date.split('-').map(Number);
  const [h, mi] = time.split(':').map(Number);
  const d = new Date(Y, M - 1, D, h, mi + minutes);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
};

/** @returns {boolean} false pour un horaire non encore défini (ex. "Bientôt disponible"). */
export const hasKnownStartTime = (event) => TIME_REGEX.test(event.times[0]);

/**
 * @returns {{ startDate: string, endDate: string|null }} ISO datetime si l'heure est connue, sinon date seule et endDate null.
 */
export const getEventSchedule = (event) => {
  const hasStartTime = hasKnownStartTime(event);
  const startDate = hasStartTime ? `${event.date}T${event.times[0]}:00` : event.date;
  const endDate = hasStartTime ? addMinutes(event.date, event.times[0], event.duration) : null;
  return { startDate, endDate };
};

export const isPastEvent = (event, now = new Date()) => {
  const lastTime = event.times[event.times.length - 1];
  const end = new Date(`${event.date}T${lastTime}`);
  end.setMinutes(end.getMinutes() + event.duration);
  return end < now;
};

export const splitEventsByDate = (events, now = new Date()) => {
  const upcoming = [];
  const past = [];

  events.forEach((event) => {
    (isPastEvent(event, now) ? past : upcoming).push(event);
  });

  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  past.sort((a, b) => b.date.localeCompare(a.date));

  return { upcoming, past };
};
