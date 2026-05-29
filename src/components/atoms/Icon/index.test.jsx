import { render } from '@testing-library/react';
import Icon from '.';

describe('Icon', () => {
  it('rend un SVG pour une icône connue', () => {
    const { container } = render(<Icon name="calendar" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('retourne null pour un nom d\'icône inconnu', () => {
    const { container } = render(<Icon name="unknown" />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('applique la taille passée en prop', () => {
    const { container } = render(<Icon name="play" size={24} />);
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('24');
    expect(svg.getAttribute('height')).toBe('24');
  });

  it('rend toutes les icônes sans erreur', () => {
    const names = [
      'calendar', 'map-pin', 'clock', 'ticket', 'arrow-right',
      'download', 'play', 'pause', 'mail', 'phone', 'check',
      'instagram', 'youtube',
    ];
    names.forEach((name) => {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});
