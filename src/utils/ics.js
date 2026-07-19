const padNumber = (n) => String(n).padStart(2, '0');

const escapeICSValue = (s) =>
  s.replace(/[,;]/g, (m) => '\\' + m).replace(/\n/g, '\\n');

const buildVEvent = (event, time, index) => {
  const start = event.date.replace(/-/g, '') + 'T' + time.replace(':', '') + '00';
  const [Y, M, D] = event.date.split('-').map(Number);
  const [h, mi] = time.split(':').map(Number);
  const endDate = new Date(Date.UTC(Y, M - 1, D, h, mi));
  endDate.setUTCMinutes(endDate.getUTCMinutes() + event.duration);
  const end = [
    endDate.getUTCFullYear(),
    padNumber(endDate.getUTCMonth() + 1),
    padNumber(endDate.getUTCDate()),
    'T',
    padNumber(endDate.getUTCHours()),
    padNumber(endDate.getUTCMinutes()),
    '00',
  ].join('');
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VEVENT',
    `UID:${event.id}-${index}@2x2voix`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Europe/Paris:${start}`,
    `DTEND;TZID=Europe/Paris:${end}`,
    `SUMMARY:2x2 Voix — ${escapeICSValue(event.title)}`,
    `LOCATION:${escapeICSValue(event.venue + ', ' + event.address)}`,
    `DESCRIPTION:${escapeICSValue(event.note)}`,
    'END:VEVENT',
  ].join('\r\n');
};

export const buildICS = (event) => [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//2x2 Voix//Site//FR',
  ...event.times.map((time, index) => buildVEvent(event, time, index)),
  'END:VCALENDAR',
].join('\r\n');

export const downloadICS = (event) => {
  const ics = buildICS(event);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `2x2voix-${event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
