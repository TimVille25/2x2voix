import { describe, it, expect } from 'vitest';
import { buildICS } from './ics.js';

const baseEvent = {
  id: 'test-2026-07-04',
  date: '2026-07-04',
  duration: 60,
  title: 'Concert test',
  venue: 'Salle de concert',
  address: 'Paris, 75001',
  note: 'Une belle soirée.',
};

describe('buildICS', () => {
  it('génère un seul VEVENT pour un concert à horaire unique', () => {
    const ics = buildICS({ ...baseEvent, times: ['20:30'] });
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(1);
    expect(ics).toContain('DTSTART;TZID=Europe/Paris:20260704T203000');
  });

  it('génère un VEVENT par créneau pour un concert à plusieurs horaires', () => {
    const ics = buildICS({ ...baseEvent, times: ['11:00', '17:00'] });
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(2);
    expect(ics).toContain('DTSTART;TZID=Europe/Paris:20260704T110000');
    expect(ics).toContain('DTSTART;TZID=Europe/Paris:20260704T170000');
    expect(ics).toContain(`UID:${baseEvent.id}-0@2x2voix`);
    expect(ics).toContain(`UID:${baseEvent.id}-1@2x2voix`);
  });
});
