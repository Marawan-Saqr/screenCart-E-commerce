import "./Subscribe.css";
import components from "../../../../Shared/Styled-components/StyledComponents";

const Subscribe = () => {
  return (
    <div className="subscribe">
      <div className="container">
        <h2 className="text-center mt-5 mb-5" style={{textTransform: 'uppercase'}}>Leave a comment to review it <components.mainSpan>later</components.mainSpan></h2>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="mid d-flex align-items-center">
              <input type="text" className="form-control me-2" placeholder="Leave a comment..." />
              <components.MainButton>Subscribe</components.MainButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Subscribe;