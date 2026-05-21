import { MEMBERS } from '../data.js';
import { Portrait } from './Portrait.jsx';

const Member = ({ m, idx }) => (
  <div className="member">
    <div className="member__avatar member__avatar--svg">
      <Portrait initials={m.initials} voice={m.voice} duo={m.duo} seed={idx} />
    </div>
    <div className="member__info">
      <div className="member__name">{m.first} {m.last}</div>
      <div className="member__voice">{m.voice}</div>
    </div>
  </div>
);

const About = () => {
  const femmes = MEMBERS.filter(m => m.duo === 'F');
  const hommes = MEMBERS.filter(m => m.duo === 'M');
  return (
    <section id="quatuor" className="section section--narrow">
      <div className="section__label">Qui sommes-nous</div>
      <h2 className="section__title">Quatre frustrations<br />devenues un quatuor.</h2>

      <div className="about__story">
        <p>
          Le groupe est né d'une frustration partagée&nbsp;: ne pas trouver
          d'alter ego en chant. Chacun de nous portait des envies différentes —
          l'un rêvait de polyphonies de la Renaissance, l'autre de classique sacré,
          un autre encore de pop arrangée à quatre voix.
        </p>
        <p>
          C'est tout naturellement que nous avons mis nos capacités au service
          des envies de chacun. Nous formons aujourd'hui deux duos qui se
          répondent&nbsp;: voix de femmes, voix d'hommes — deux et deux,
          autant que possible à parts égales.
        </p>
        <p>
          Notre répertoire traverse cinq siècles sans coutures&nbsp;: de Dufay
          à Coldplay, en passant par Mozart et Brel. La même attention au
          texte, à l'accord, au silence.
        </p>
      </div>

      <div className="duos" style={{ marginTop: '40px' }}>
        <div className="duo">
          <div className="duo__label">Voix de femmes</div>
          <div className="duo__members">
            {femmes.map((m, i) => <Member key={m.initials} m={m} idx={MEMBERS.indexOf(m)} />)}
          </div>
        </div>
        <div className="duo">
          <div className="duo__label">Voix d'hommes</div>
          <div className="duo__members">
            {hommes.map((m, i) => <Member key={m.initials} m={m} idx={MEMBERS.indexOf(m)} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
