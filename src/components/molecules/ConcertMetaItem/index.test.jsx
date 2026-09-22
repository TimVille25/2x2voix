import { render, screen } from '@testing-library/react';
import ConcertMetaItem from '.';

describe('ConcertMetaItem', () => {
  it("affiche l'icône et le contenu fournis", () => {
    render(<ConcertMetaItem icon="clock">20h00</ConcertMetaItem>);
    expect(screen.getByText('20h00')).toBeInTheDocument();
  });
});
