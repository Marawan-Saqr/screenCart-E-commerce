import "./NotFound.css";
import { Link } from "react-router-dom";
import notFoundImage from "./not-found.webp";
import components from '../Styled-components/StyledComponents';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="content text-center">
              <img src={notFoundImage} alt="not-found" className="img-fluid" />
              <h1>Oops! Page Not Found</h1>
              <p>The page you’re looking for doesn’t exist or has been moved.</p>
              <components.MainButton style={{marginRight: '10px'}}><Link style={{color: 'white', textDecoration: 'none'}} to="/website">RETURN TO HOME</Link></components.MainButton>
              <components.MainButton><Link style={{color: 'white', textDecoration: 'none'}} to={"/website/products-page"}>GO TO SHOP</Link></components.MainButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;