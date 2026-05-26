import { useState } from 'react';
import Icon from './Icon.jsx';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: 'concert', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: 'concert', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div>
          <div className="contact__label">Nous écrire</div>
          <h2 className="contact__title">Une église,<br />une occasion,<br />un projet ?</h2>
          <p className="contact__sub">
            Nous répondons en quelques jours. Pour un concert, une animation
            ou un mariage&nbsp;: dites-nous où, quand, et nous reviendrons vers vous.
          </p>
          <div className="contact__details">
            <div className="contact__detail"><Icon name="mail" size={16} /> contact@2x2voix.fr</div>
            <div className="contact__detail"><Icon name="phone" size={16} /> +33 6 12 34 56 78</div>
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
                <strong>Merci, {form.name.split(' ')[0] || 'et à très vite'}.</strong><br />
                Votre message est arrivé. Nous vous répondons sous quelques jours.
              </div>
            </div>
          ) : (
            <>
              <div className="form__row">
                <div className="field">
                  <label className="field__label" htmlFor="f-name">Votre nom</label>
                  <input
                    id="f-name" className="field__input" type="text"
                    value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Prénom Nom" required
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="f-email">Email</label>
                  <input
                    id="f-email" className="field__input" type="email"
                    value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="vous@example.fr" required
                  />
                </div>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="f-subject">Objet</label>
                <select
                  id="f-subject" className="field__select"
                  value={form.subject} onChange={e => set('subject', e.target.value)}
                >
                  <option value="concert">Réservation d'un concert</option>
                  <option value="mariage">Mariage / cérémonie</option>
                  <option value="animation">Animation d'événement</option>
                  <option value="presse">Demande presse</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="field">
                <label className="field__label" htmlFor="f-msg">Votre message</label>
                <textarea
                  id="f-msg" className="field__textarea"
                  value={form.message} onChange={e => set('message', e.target.value)}
                  placeholder="Date, lieu, contexte, nombre de personnes attendues…"
                  required
                />
              </div>
              <button type="submit" className="form__submit">
                Envoyer le message <Icon name="arrow-right" size={14} />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
