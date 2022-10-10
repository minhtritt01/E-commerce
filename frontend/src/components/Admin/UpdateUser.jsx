import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import MetaData from '../../more/MetaData'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonIcon from '@mui/icons-material/Person'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import SideBar from './Sidebar'
import { UPDATE_USER_RESET } from '../../constants/userContants'
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from '../../actions/userActions'
import Loading from '../../more/Loader'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { loading, error, user } = useSelector((state) => state.userDetails)

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const userId = id
  console.log(id)
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    }
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }

    if (updateError) {
      toast.error(updateError)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      toast.success('User Updated Successfully')
      navigate('/admin/users')
      dispatch({ type: UPDATE_USER_RESET })
    }
  }, [dispatch, error, navigate, isUpdated, updateError, user, userId])

  const updateUserSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = { name, email, role }

    dispatch(updateUser(userId, myForm))
  }

  return (
    <Fragment>
      <MetaData title='Update User' />
      <div className='dashboard'>
        <SideBar />
        <div className='newProductContainer'>
          {loading ? (
            <Loading />
          ) : (
            <form
              className='createProductForm'
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type='text'
                  placeholder='Name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type='email'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value=''>Choose Role</option>
                  <option value='admin'>admin</option>
                  <option value='user'>user</option>
                </select>
              </div>

              <Button
                id='createProductBtn'
                type='submit'
                disabled={
                  updateLoading ? true : false || role === '' ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
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

export default UpdateUser
