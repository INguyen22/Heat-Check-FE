import React, { useState } from 'react'
import fireIcon from '../Images/fire-svgrepo-com.svg'
import bathroomLogo from "../Images/gotta-go.png"
import { gql, useMutation} from '@apollo/client'
import Loading from '../Loading/Loading'
import "./NewDishReview.css"

const NewDishReviewForm = ({id, addDishToArray, setShowForm, toggleModal, user, category, getRestaurant}) => {
  console.log('rest', getRestaurant)
  console.log('id9', id)

  const ADD_DISH = gql`
  mutation AddDish($name: String!, $cuisineType: String!, $yelpId: String!, $spiceRating: Int!){
    dish: createDish(
      input: {
        name: $name
        cuisineType: $cuisineType
        yelpId: $yelpId
        spiceRating: $spiceRating
      }
    ) {
      name
      cuisineType
      yelpId
      spiceRating
    }
  }
  `
function Form() {
  const [dishName, setDishName] = useState('')
  // const [description, setDescription] = useState('')
  const [rating, setRating] = useState(0)
  const [addDish, { loading, error}] = useMutation(ADD_DISH, {
    refetchQueries: [
      {query: getRestaurant,
        variables:{
          yelp_id: id
        }}
    ],
  })

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!dishName || !rating) {
      return
    }
    addDish({ variables: {
      name: dishName,
      cuisineType: category,
      yelpId: id,
      spiceRating: rating
    }})
    setShowForm(false)
    toggleModal()
  }

  return (
    <div className='newFormPage'>
      <img onClick={() => toggleModal()} className="exitModalImage" src={bathroomLogo} alt="close modal"/>
      <form  className="newDishForm" onSubmit={handleSubmit}>
        <div className='ratingContainer'>
          <img className="fire" src={fireIcon} alt='fire1' onClick={() => {setRating(1)}}></img>
          <img className="fire" src={fireIcon} alt='fire2' onClick={() => {setRating(2)}}></img>
          <img className="fire" src={fireIcon} alt='fire3' onClick={() => {setRating(3)}}></img>
          <img className="fire" src={fireIcon} alt='fire4' onClick={() => {setRating(4)}}></img>
          <img className="fire" src={fireIcon} alt='fire5' onClick={() => {setRating(5)}}></img>
          <p className='spiceRating'>rating: {rating} </p>
        </div>
        <div className='inputSection'>
          <input
            placeholder='Dish Name'
            value={dishName}
            onChange={(event) => setDishName(event.target.value)}
            name='dishName'
          />
          <button className="submitNewDishButton" type='submit'>Add New Dish Review</button>
        </div>
      </form>
    </div>
  )
}

return (
  <div>
    <Form/>
  </div>
)

}

export default NewDishReviewForm