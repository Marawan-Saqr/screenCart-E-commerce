import "./AddBanner.css";
import components from '../../../../Shared/Styled-components/StyledComponents';

const AdBanner = () => {
  return (
    <div className="ad-banner">
      <div className="lists text-center">
        <ul>
          <li>
            <div>
              <span>02</span>
              <p>DAYS</p>
            </div>
          </li>
          <li>
            <div>
              <span>10</span>
              <p>HOURS</p>
            </div>
          </li>
          <li>
            <div>
              <span>34</span>
              <p>MINS</p>
            </div>
          </li>
          <li>
            <div>
              <span>60</span>
              <p>SECS</p>
            </div>
          </li>
        </ul>
        <div className="content">
          <h2>hot deal this week</h2>
          <p>New Collection Up to 50% OFF</p>
          <components.MainButton>SHOP NOW</components.MainButton>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
