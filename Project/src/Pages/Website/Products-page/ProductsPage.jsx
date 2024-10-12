import AllProducts from '../../../Shared/Products/AllProducts';
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