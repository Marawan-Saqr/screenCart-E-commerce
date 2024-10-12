import Collection from './Collection/Collection';
import AllProducts from '../../../Shared/Products/AllProducts';
import { TitleProvider } from '../../../Hooks/titleContext';
import AdBanner from './Ad-banner/AdBanner';
import Subscribe from '../Shared-for-this/Subscribe/Subscribe';

const Home = () => {
  return (
    <div>
      <Collection />
      <TitleProvider title="New Products">
        <AllProducts limit={4} />
      </TitleProvider>
      <AdBanner />
      <TitleProvider title="Top Selling">
        <AllProducts limit={4} ratingFilter={5} />
      </TitleProvider>
      <hr />
      <Subscribe />
    </div>
  );
}

export default Home;
