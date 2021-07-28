import React, {useContext} from 'react';
import {DataContext} from '../contexts/DataProvider';
import {Product} from '../components/Product';

export const Shop = () =>
{
    const {products} = useContext(DataContext);
    //console.log(products)
    return (
        <React.Fragment>
            <h3>Shop</h3>
            <hr />
​
            <div className="card-deck">
                {products.map(p => <Product key={p.id} product={p}/>)}
            </div>
        </React.Fragment>
    )
}