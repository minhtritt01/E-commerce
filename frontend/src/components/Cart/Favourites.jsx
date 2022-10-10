import React from 'react'
import './Favourites.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFavouriteItemsToCart } from '../../actions/FavouriteActions'
import Typography from '@mui/material/Typography'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { Link } from 'react-router-dom'
import FavouriteItemsCard from './FavouriteItemsCard.jsx'
import MetaData from '../../more/MetaData'
import Loading from '../../more/Loader'
import BottomTab from '../../more/BottomTab'

const Favourite = () => {
  const dispatch = useDispatch()

  const { loading } = useSelector((state) => state.productDetails)
  const { favouriteItems } = useSelector((state) => state.favourite)

  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id))
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title='Favourites Items' />
          {favouriteItems.length === 0 ? (
            <div className='emptyCart'>
              <RemoveShoppingCartIcon />
              <Typography>No Items In Favourites</Typography>
              <Link to='/products'>View Products</Link>
              <BottomTab />
            </div>
          ) : (
            <>
              <div className='favouritesPage'>
                <div className='favouritesHeader'>
                  <p>Product</p>
                  <p>Price</p>
                  <p>Stock Status</p>
                  <p>Action</p>
                </div>
                {favouriteItems &&
                  favouriteItems.map((item) => (
                    <div className='favouritesContainer' key={item.product}>
                      <FavouriteItemsCard
                        item={item}
                        deleteFavouriteItems={deleteFavouriteItems}
                      />
                    </div>
                  ))}
                <BottomTab />
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Favourite
