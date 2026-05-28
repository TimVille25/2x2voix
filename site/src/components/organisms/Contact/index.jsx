import { useState } from 'react';
import Icon from '../../atoms/Icon';
import './style.css';

const FORM_ENDPOINT = 'https://formspree.io/f/mpqnblrl';
const EMPTY_FORM = { name: '', email: '', subject: 'concert', message: '' };

const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      });
      if (res.ok) {
        setSentName(form.name.split(' ')[0] || '');
        setSent(true);
        setForm(EMPTY_FORM);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div>
          <h2 className="contact__label">Nous écrire</h2>
          <div className="contact__title">Une église,<br />une occasion,<br />un projet ?</div>
          <p className="contact__sub">
            Nous répondons en quelques jours. Pour un concert, une animation
            ou un mariage&nbsp;: dites-nous où, quand, et nous reviendrons vers vous.
          </p>
          <div className="contact__details">
            <div className="contact__detail"><Icon name="mail" size={16} /> 2x2voix@gmail.com</div>
            <div className="contact__detail"><Icon name="map-pin" size={16} /> Basés en Bourgogne–Franche-Comté</div>
            <div className="contact__detail">
              <a href="https://www.instagram.com/2x2voix" target="_blank" rel="noopener noreferrer" className="contact__detail-link">
                <Icon name="instagram" size={16} /> @2x2voix
              </a>
            </div>
            <div className="contact__detail">
              <a href="https://www.youtube.com/@2x2voix" target="_blank" rel="noopener noreferrer" className="contact__detail-link">
                <Icon name="youtube" size={16} /> youtube.com/@2x2voix
              </a>
            </div>
          </div>
        </div>

        <form className="form" onSubmit={submit}>
          {sent ? (
            <div className="form__success">
              <Icon name="check" size={18} />
              <div>
                <strong>Merci{sentName ? `, ${sentName}` : ''}&nbsp;!</strong><br />
                Votre message est arrivé. Nous vous répondons sous quelques jours.
              </div>
            </div>
          ) : (
            <>
              <div className="form__row">
                <div className="field">
                  <label className="field__label" htmlFor="f-name">Votre nom</label>
                  <input
                    id="f-name" name="name" className="field__input" type="text"
                    value={form.name} onChange={(e) => setField('name', e.target.value)}
                    placeholder="Prénom Nom" required
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="f-email">Email</label>
                  <input
                    id="f-email" name="email" className="field__input" type="email"
                    value={form.email} onChange={(e) => setField('email', e.target.value)}
                    placeholder="vous@example.fr" required
                  />
                </div>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="f-subject">Objet</label>
                <select
                  id="f-subject" name="subject" className="field__select"
                  value={form.subject} onChange={(e) => setField('subject', e.target.value)}
                >
                  <option value="Concert">Réservation d'un concert</option>
                  <option value="Mariage">Mariage / cérémonie</option>
                  <option value="Animation">Animation d'événement</option>
                  <option value="Presse">Demande presse</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="f-msg">Votre message</label>
                <textarea
                  id="f-msg" name="message" className="field__textarea"
                  value={form.message} onChange={(e) => setField('message', e.target.value)}
                  placeholder="Date, lieu, contexte, nombre de personnes attendues…"
                  required
                />
              </div>
              {error && (
                <p className="form__error">
                  Une erreur s'est produite. Réessayez ou écrivez-nous directement à 2x2voix@gmail.com.
                </p>
              )}
              <button type="submit" className="form__submit" disabled={loading}>
                {loading ? 'Envoi…' : <> Envoyer le message <Icon name="arrow-right" size={14} /></>}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
