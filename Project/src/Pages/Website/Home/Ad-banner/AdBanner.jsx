import './AddBanner.css';
import { Link } from 'react-router-dom';
import components from '../../../../Shared/Styled-components/StyledComponents';

const AdBanner = () => {
  return (
    <div className="ad-banner">
      <div className="container">
        <div className="ad-timer">
          <ul>
            <li>
              <h3>02</h3>
              <span>Days</span>
            </li>
            <li>
              <h3>10</h3>
              <span>Hours</span>
            </li>
            <li>
              <h3>34</h3>
              <span>Minutes</span>
            </li>
            <li>
              <h3>60</h3>
              <span>Seconds</span>
            </li>
          </ul>
        </div>
        <div className="content">
          <h2 style={{textTransform: 'uppercase'}}>Hot Deal This Week</h2>
          <p>New Collection Up to 50% OFF</p>
          <components.MainButton>
            <Link style={{color: '#fff', textDecoration: 'none'}} to="/website/products-page">Shop Now</Link>
          </components.MainButton>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
