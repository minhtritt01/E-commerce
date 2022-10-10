import React, { Fragment, useEffect, useState } from 'react'
import './CreateProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, createProduct } from '../../actions/ProductActions'
import Button from '@mui/material/Button'
import MetaData from '../../more/MetaData'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import DescriptionIcon from '@mui/icons-material/Description'
import StorageIcon from '@mui/icons-material/Storage'
import SpellcheckIcon from '@mui/icons-material/Spellcheck'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import DiscountIcon from '@mui/icons-material/LocalOffer'
import SideBar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../constants/ProductConstants'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, success } = useSelector(
    (state) => state.createProduct
  )

  const [discountPrice, setDiscountPrice] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [Stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const categories = [
    'Personal',
    'cloth',
    'Ladies Cloth',
    'Gift',
    'Food',
    'Electronics',
    'Sports',
    'Others',
  ]

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }

    if (success) {
      toast.success('Product Created Successfully')
      navigate('/dashboard')
      dispatch({ type: NEW_PRODUCT_RESET })
    }
  }, [dispatch, error, navigate, success])
  console.log(images)

  const createProductSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = {
      name,
      price,
      description,
      discountPrice,
      category,
      Stock,
      images,
    }

    dispatch(createProduct(myForm))
  }

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result])
          setImages((old) => [...old, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <Fragment>
      <MetaData title='Create Product' />
      <div className='dashboard'>
        <SideBar />
        <div className='newProductContainer'>
          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type='text'
                placeholder='Product Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <DiscountIcon />
              <input
                type='String'
                placeholder='Discount Percent *optional'
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type='number'
                placeholder='Product Price'
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder='Product Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols='30'
                rows='1'
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value=''>Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type='number'
                placeholder='Stock'
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id='createProductFormFile'>
              <input
                type='file'
                name='avatar'
                accept='image/*'
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id='createProductFormImage'>
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt='Product Preview' />
              ))}
            </div>

            <Button
              id='createProductBtn'
              type='submit'
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  )
}

export default CreateProduct
