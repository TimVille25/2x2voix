import Icon from '../../atoms/Icon';
import './style.css';

const ConcertMetaItem = ({ icon, children }) => (
  <span className="concert-meta-item">
    <Icon name={icon} size={16} />
    {children}
  </span>
);

export default ConcertMetaItem;
