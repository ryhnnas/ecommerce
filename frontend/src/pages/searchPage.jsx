import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ProductCard } from "./homepage";

function SearchPage() {

    const [products, setProducts] = useState([]);

    const styles = {
        productList: { display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none', 'msOverflowStyle': 'none' },
        mencari: { fontWeight: 'lighter', fontFamily: 'Inter' },
        param: { fontWeight: "bold" },
        container: { marginLeft: '16rem', marginRight: '16rem' }
    };

    const param = useParams()

    const handleSearch = async () => {
        const response = await fetch(`http://localhost:8080/api/products/search?name=${param.name}`)
        const data = await response.json()
        setProducts(data)
    }

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <div style={styles.container}>
            <h1 style={styles.mencari}>Mencari <span style={styles.param}>{param.name}</span></h1>
            <div style={styles.productList} className="product-list">
                {products.map(e => <ProductCard key={e.id} product={e} />)}
                {/* {trendingProducts.map(product => <ProductCard key={product.id} product={product} />)} */}
            </div>
        </div>
    )

}

export default SearchPage