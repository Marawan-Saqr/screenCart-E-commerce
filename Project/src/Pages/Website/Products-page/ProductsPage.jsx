import AllProducts from '../Shared-for-this/Products/AllProducts';
import { TitleProvider } from '../Contexts/titleContext';


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