import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Contact from '.';

describe('Contact', () => {
  it('affiche le titre et le sous-titre', () => {
    render(<Contact />);
    expect(screen.getByText('Nous écrire')).toBeInTheDocument();
    expect(screen.getByText(/Une église/i)).toBeInTheDocument();
  });

  it('affiche le formulaire de contact', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/Votre nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Objet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre message/i)).toBeInTheDocument();
  });

  it('affiche le bouton d\'envoi', () => {
    render(<Contact />);
    expect(screen.getByRole('button', { name: /Envoyer le message/i })).toBeInTheDocument();
  });

  it('met à jour les champs du formulaire', () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText(/Votre nom/i);
    fireEvent.change(nameInput, { target: { value: 'Jean Dupont' } });
    expect(nameInput.value).toBe('Jean Dupont');
  });

  it('affiche le message de succès après envoi réussi', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true }));
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/Votre nom/i), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jean@test.fr' } });
    fireEvent.change(screen.getByLabelText(/Votre message/i), { target: { value: 'Bonjour' } });
    fireEvent.submit(screen.getByRole('button', { name: /Envoyer le message/i }).closest('form'));
    await waitFor(() => {
      expect(screen.getByText(/Merci, Jean/i)).toBeInTheDocument();
    });
  });

  it('affiche un message d\'erreur en cas d\'échec', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: false }));
    render(<Contact />);
    fireEvent.submit(screen.getByRole('button', { name: /Envoyer le message/i }).closest('form'));
    await waitFor(() => {
      expect(screen.getByText(/Une erreur s'est produite/i)).toBeInTheDocument();
    });
  });

  it('a la section avec l\'id contact', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });
});
