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
