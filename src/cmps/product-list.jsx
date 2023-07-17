import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProducts } from "../store/actions/product.actions"
import { ProductPreview } from '../cmps/product-preview'

export function ProductList() {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.productModule)
    const { items } = useSelector(state => state.cartModule);

    useEffect(() => {
        console.log('product list')
        dispatch(loadProducts())
    }, []);

    return (
        <section className="products-cards">
            <div className="card-layout">
                {products.map((product) => (
                    <ProductPreview key={product.id} product={product} />
                ))}
                <button onClick={() => console.log(items)}>sdfdsfsdfsdf</button>
            </div>
        </section>
    );
}
