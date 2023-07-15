import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProducts } from "../store/actions/product.actions"

export function ProductList() {

    const dispatch = useDispatch()
    const { products, isLoading } = useSelector(state => state.productModule)

    useEffect(() => {
        dispatch(loadProducts())
    }, []);
    return (<>
        <section className="products-cards">
            <div className='card-layout'>
                {products.map(product =>
                    <div className={'preview-card card-ID' + product.id} key={'productNum' + product.id} >
                        <p>{product.product_name}</p>
                        {/* <p>{product}</p>    <ProductPreview key={product.id} product={product} /> */}
                    </div>)}
            </div>
        </section>
    </>
    )
}
