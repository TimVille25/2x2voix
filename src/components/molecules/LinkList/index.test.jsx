import { render, screen } from '@testing-library/react';
import LinkList from '.';

describe('LinkList', () => {
  it("n'affiche rien quand aucun lien n'est fourni", () => {
    const { container } = render(<LinkList links={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('affiche chaque lien avec une cible sécurisée', () => {
    render(<LinkList links={[{ label: 'Site officiel', url: 'https://example.com' }]} />);
    const link = screen.getByRole('link', { name: /Site officiel/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
