import './Collection.css';
import collectionOne from './images/collection1.webp';
import collectionTwo from './images/collection2.webp';
import collectionThree from './images/collection3.webp';


const Collection = () => {
  return (
    <div className="collection">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div className="box position-relative">
              <img src={collectionOne} className="img-fluid" alt="Collection One" />
              <div className="overlay"></div>
              <div className="text-content">
                <h2>Laptop Collection</h2>
                <a href="/shop" className="shop-now-btn">SHOP NOW ➔</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="box two position-relative">
              <img src={collectionTwo} className="img-fluid" alt="Collection One" />
              <div className="overlay"></div>
              <div className="text-content">
                <h2>Laptop Collection</h2>
                <a href="/shop" className="shop-now-btn">SHOP NOW ➔</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="box three position-relative">
              <img src={collectionThree} className="img-fluid" alt="Collection One" />
              <div className="overlay"></div>
              <div className="text-content">
                <h2>Laptop Collection</h2>
                <a href="/shop" className="shop-now-btn">SHOP NOW ➔</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
