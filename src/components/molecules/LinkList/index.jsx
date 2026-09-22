import Icon from '../../atoms/Icon';
import './style.css';

const LinkList = ({ links = [] }) => {
  if (links.length === 0) return null;

  return (
    <ul className="link-list">
      {links.map((link) => (
        <li key={link.url}>
          <a
            className="link-list__link"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="external-link" size={14} /> {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
