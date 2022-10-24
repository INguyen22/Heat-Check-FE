import React, { useState } from 'react'
import { gql, useMutation} from '@apollo/client'
import "./OldDishReviewForm.css"
import fireIcon from '../Images/fire-svgrepo-com.svg'
import bathroomLogo from "../Images/gotta-go.png"
import Loading from '../Loading/Loading'

const OldDishReviewForm = ({ oldDishObject, setShowOldForm, toggleModal, user, getDishReviews }) => {

  const ADD_REVIEW_TO_DISH = gql`
  mutation AddReview ($description: String!, $overallRating: Int!, $userId: ID!, $dishId: ID!){
    review: createReview(
      input: {
        description: $description
        overallRating: $overallRating
        userId: $userId
        dishId: $dishId
      }
  ) {
      description
      overallRating
      userId
      dishId
    }
  }
  `

  function ExistingDishForm() {
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')
    const [addReview, { loading, error}] = useMutation(ADD_REVIEW_TO_DISH, {
      refetchQueries: [
        {query: getDishReviews,
          variables:{
            id: oldDishObject.dishId
          }}
      ],
    })

    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;

    const handleSubmit = (event) => {
      event.preventDefault()
      if (!description || !rating) {
        return
      }
      addReview({ variables: {
        description: description,
        overallRating: rating,
        userId: user.id,
        dishId: oldDishObject.dishId
      }})
      setShowOldForm(false)
      toggleModal()
    }

    return (
      <div className='oldFormPage'>
        <img onClick={() => toggleModal()} className="exitModalImage" src={bathroomLogo} alt="close modal" />
        <form className="oldDishForm" onSubmit={handleSubmit}>
          <div className='ratingContainer'>
            <img className="fire" src={fireIcon} alt='fire1' onClick={() => { setRating(1) }}></img>
            <img className="fire" src={fireIcon} alt='fire2' onClick={() => { setRating(2) }}></img>
            <img className="fire" src={fireIcon} alt='fire3' onClick={() => { setRating(3) }}></img>
            <img className="fire" src={fireIcon} alt='fire4' onClick={() => { setRating(4) }}></img>
            <img className="fire" src={fireIcon} alt='fire5' onClick={() => { setRating(5) }}></img>
            <p className='spiceRating'>rating: {rating} </p>
          </div>
  
          <div className='inputSection'>
          <input
            placeholder='Review...'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            name='description'
          ></input>
          <button type='submit'>Add New Review</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <ExistingDishForm />
    </div>
  )
  }


export default OldDishReviewForm