import { describe, it, expect } from 'vitest';
import { isPastEvent, splitEventsByDate, hasKnownStartTime, getEventSchedule } from './events.js';

const makeEvent = (id, date, times = ['19:00'], duration = 60) => ({
  id, date, times, duration,
});

describe('hasKnownStartTime', () => {
  it('retourne true pour un horaire au format HH:MM', () => {
    expect(hasKnownStartTime(makeEvent('t', '2026-07-04', ['19:00']))).toBe(true);
  });

  it('retourne false pour un horaire non encore défini', () => {
    expect(hasKnownStartTime(makeEvent('t', '2026-07-04', ['Bientôt disponible']))).toBe(false);
  });
});

describe('getEventSchedule', () => {
  it('calcule la date de début et de fin à partir de la durée', () => {
    const event = makeEvent('test', '2026-07-04', ['20:30'], 60);
    expect(getEventSchedule(event)).toEqual({
      startDate: '2026-07-04T20:30:00',
      endDate: '2026-07-04T21:30:00',
    });
  });

  it('n\'expose pas de date de fin quand l\'horaire n\'est pas encore défini', () => {
    const event = makeEvent('test', '2026-11-28', ['Bientôt disponible'], 50);
    expect(getEventSchedule(event)).toEqual({
      startDate: '2026-11-28',
      endDate: null,
    });
  });
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
