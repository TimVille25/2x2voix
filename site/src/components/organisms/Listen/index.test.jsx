import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Listen from '.';

const mockAudio = {
  play: vi.fn(() => Promise.resolve()),
  pause: vi.fn(),
  onloadedmetadata: null,
  ontimeupdate: null,
  onended: null,
};

beforeEach(() => {
  vi.stubGlobal('Audio', vi.fn(function () { return mockAudio; }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Listen', () => {
  it('affiche le titre de la section', () => {
    render(<Listen />);
    expect(screen.getByText('Écouter')).toBeInTheDocument();
  });

  it('affiche toutes les pistes', () => {
    render(<Listen />);
    expect(screen.getByText('Nothern lights')).toBeInTheDocument();
    expect(screen.getByText('Cantique de Jean Racine')).toBeInTheDocument();
  });

  it('affiche les boutons de lecture pour chaque piste', () => {
    render(<Listen />);
    const playButtons = screen.getAllByRole('button', { name: /Lecture/i });
    expect(playButtons.length).toBeGreaterThan(0);
  });

  it('lance la lecture au clic sur un bouton play', async () => {
    render(<Listen />);
    const playButtons = screen.getAllByRole('button', { name: /Lecture/i });
    fireEvent.click(playButtons[0]);
    expect(mockAudio.play).toHaveBeenCalled();
  });

  it('a la section avec l\'id ecouter', () => {
    const { container } = render(<Listen />);
    expect(container.querySelector('#ecouter')).toBeInTheDocument();
  });
});
