import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Track from '.';

const mockTrack = {
  title: 'Northern Lights',
  sub: 'Ola Gjeilo',
  duration: 254,
  file: 'northern-lights.mp3',
};

describe('Track', () => {
  it('affiche le titre et le compositeur', () => {
    render(<Track track={mockTrack} isPlaying={false} onToggle={vi.fn()} progress={0} />);
    expect(screen.getByText('Northern Lights')).toBeInTheDocument();
    expect(screen.getByText('Ola Gjeilo')).toBeInTheDocument();
  });

  it('affiche le bouton Lecture quand la piste n\'est pas en cours', () => {
    render(<Track track={mockTrack} isPlaying={false} onToggle={vi.fn()} progress={0} />);
    expect(screen.getByRole('button', { name: /Lecture/i })).toBeInTheDocument();
  });

  it('affiche le bouton Pause quand la piste est en cours', () => {
    render(<Track track={mockTrack} isPlaying={true} onToggle={vi.fn()} progress={30} duration={254} />);
    expect(screen.getByRole('button', { name: /Pause/i })).toBeInTheDocument();
  });

  it('appelle onToggle au clic', () => {
    const onToggle = vi.fn();
    render(<Track track={mockTrack} isPlaying={false} onToggle={onToggle} progress={0} />);
    fireEvent.click(screen.getByRole('button', { name: /Lecture/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('désactive le bouton si aucun fichier audio n\'est disponible', () => {
    const unavailableTrack = { ...mockTrack, file: null };
    render(<Track track={unavailableTrack} isPlaying={false} onToggle={vi.fn()} progress={0} />);
    expect(screen.getByRole('button', { name: /Lecture/i })).toBeDisabled();
  });

  it('affiche les temps de lecture formatés', () => {
    render(<Track track={mockTrack} isPlaying={true} onToggle={vi.fn()} progress={65} duration={254} />);
    expect(screen.getByText('1:05')).toBeInTheDocument();
    expect(screen.getByText('4:14')).toBeInTheDocument();
  });
});
