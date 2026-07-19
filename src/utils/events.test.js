import { describe, it, expect } from 'vitest';
import { isPastEvent, splitEventsByDate } from './events.js';

const makeEvent = (id, date, times = ['19:00'], duration = 60) => ({
  id, date, times, duration,
});

describe('isPastEvent', () => {
  it('retourne false pour un événement futur', () => {
    const event = makeEvent('futur', '2026-08-23');
    expect(isPastEvent(event, new Date('2026-07-19T12:00:00'))).toBe(false);
  });

  it('retourne true pour un événement terminé', () => {
    const event = makeEvent('passe', '2026-01-10');
    expect(isPastEvent(event, new Date('2026-07-19T12:00:00'))).toBe(true);
  });

  it('retourne false pendant que l\'événement est en cours', () => {
    const event = makeEvent('en-cours', '2026-07-19', ['19:00'], 90);
    expect(isPastEvent(event, new Date('2026-07-19T19:30:00'))).toBe(false);
  });

  it('se base sur le dernier créneau pour un événement à plusieurs horaires', () => {
    const event = makeEvent('multi-horaires', '2026-07-19', ['11:00', '17:00'], 60);
    expect(isPastEvent(event, new Date('2026-07-19T12:00:00'))).toBe(false);
    expect(isPastEvent(event, new Date('2026-07-19T18:30:00'))).toBe(true);
  });
});

describe('splitEventsByDate', () => {
  it('sépare les événements passés des à venir', () => {
    const events = [
      makeEvent('passe-1', '2026-01-10'),
      makeEvent('futur-1', '2026-09-20'),
      makeEvent('passe-2', '2026-03-05'),
      makeEvent('futur-2', '2026-08-23'),
    ];
    const now = new Date('2026-07-19T12:00:00');

    const { upcoming, past } = splitEventsByDate(events, now);

    expect(upcoming.map((e) => e.id)).toEqual(['futur-2', 'futur-1']);
    expect(past.map((e) => e.id)).toEqual(['passe-2', 'passe-1']);
  });
});
