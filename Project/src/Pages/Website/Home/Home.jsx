import Collection from './Collection/Collection';
import AllProducts from '../Shared-for-this/Products/AllProducts';
import { TitleProvider } from '../Contexts/titleContext';
import AdBanner from './Ad-banner/AdBanner';

const Home = () => {
  return (
    <div>
      <Collection />
      <TitleProvider title="New Products">
        <AllProducts limit={4} />
      </TitleProvider>
      <AdBanner />
    </div>
  )
}
export default Home;