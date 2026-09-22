import { render, screen } from '@testing-library/react';
import TicketStub from '.';

describe('TicketStub', () => {
  it("affiche le jour, le mois et l'année du concert", () => {
    render(<TicketStub day={20} month="Octobre" year={2026} />);
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('Octobre')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });
});
