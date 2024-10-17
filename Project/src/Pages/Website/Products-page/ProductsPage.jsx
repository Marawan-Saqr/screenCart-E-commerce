import AllProducts from '../../Website/Shared-for-this/Products/AllProducts';
import { TitleProvider } from '../../../Hooks/titleContext';


const ProductsPage = () => {
  return (
    <div>
      <TitleProvider title="All Products">
        <AllProducts />
      </TitleProvider>
    </div>
  )
}
export default ProductsPage;