import { render } from '@testing-library/react';
import Portrait from '.';

describe('Portrait', () => {
  it('rend un SVG avec les initiales', () => {
    const { container } = render(<Portrait initials="TV" voice="Ténor" duo="M" seed={0} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('text')).toBeInTheDocument();
  });

  it('utilise une palette différente selon seed', () => {
    const { container: c1 } = render(<Portrait initials="AL" voice="Soprano" duo="F" seed={0} />);
    const { container: c2 } = render(<Portrait initials="AL" voice="Soprano" duo="F" seed={1} />);
    const rect1 = c1.querySelector('rect');
    const rect2 = c2.querySelector('rect');
    expect(rect1.getAttribute('fill')).not.toBe(rect2.getAttribute('fill'));
  });

  it('applique une forme de corps différente pour les voix féminines (duo F)', () => {
    const { container: cF } = render(<Portrait initials="AL" voice="Soprano" duo="F" seed={0} />);
    const { container: cM } = render(<Portrait initials="TV" voice="Ténor" duo="M" seed={0} />);
    const pathF = cF.querySelectorAll('path')[0].getAttribute('d');
    const pathM = cM.querySelectorAll('path')[0].getAttribute('d');
    expect(pathF).not.toBe(pathM);
  });
});
