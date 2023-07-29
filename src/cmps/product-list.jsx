import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProducts } from "../store/actions/product.actions"
import { ProductPreview } from '../cmps/product-preview'

export function ProductList(props) {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.productModule)
    // const { items } = useSelector(state => state.cartModule);

    useEffect(() => {
        if (!products || !products.length)
            console.log('loading products')
            dispatch(loadProducts())
    }, [dispatch])

    if (!products) return <div>Loading...</div>

    return (
        <div className="product-list">
            <div className="card-layout">
                {products && products.map(product => <ProductPreview key={product.id} product={product} />)}
            </div>
        </div>
    )
}
