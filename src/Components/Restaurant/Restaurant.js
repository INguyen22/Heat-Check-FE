import React, { useState } from 'react'
import { gql, useQuery} from '@apollo/client'
import "./Restaurant.css"
import { useParams } from 'react-router-dom'
import NewDishReviewForm from '../NewDishReviewForm/NewDishReviewForm';
import OldDishReviewForm from '../OldDishReviewForm/OldDishReviewForm';
import DishCard from '../DishCard/DishCard';
import Modal from "react-modal";
import Loading from '../Loading/Loading'

const Restaurant = ({ setRestaurantInApp, user }) => {
  let { id } = useParams();
  setRestaurantInApp(id)
  const [newDishes, setNewDishes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showOldForm, setShowOldForm] = useState(false)
  const [oldDishObject, setOldDishObject] = useState({})
  const [isOpen, setIsOpen] = useState(false);

  const GET_RESTAURANT = gql`
  query Restaurant($yelp_id: String! ) {
    restaurant(id: $yelp_id) {
      id
      name
      rating
      price
      imageUrl
      url
      categories
      address
      phone
      lat
      lon
      city
      dishes {
        id
        name
        cuisineType
        yelpId
        spiceRating
        reviews {
          id
          description
          userId
          }
        }
      }
    }
  `;

  const GET_DISH_REVIEWS = gql`
  query Dish($id: ID! ) {
    dish(id: $id) {
      id
      name
      cuisineType
      yelpId
      spiceRating
      reviews {
        id
        description
        overallRating
        userId
        dishId
      }
    }
  }
  `;

  const addDishToArray = (newDish) => {
    setNewDishes([...newDishes, newDish])
  }

  const toggleModal = () => {
    setShowForm(true)
    setIsOpen(!isOpen)
  }

  const dishCards = newDishes.map(dish => {
    const { name, rating, description } = dish
    return <DishCard
      key={dish.id}
      dishId={dish.id}
      name={name}
      user={user}
      rating={rating}
      description={description}
      setShowOldForm={setShowOldForm}
      setShowForm={setShowForm}
      setOldDishObject={setOldDishObject}
      toggleModal={toggleModal}
      getDishReviews={GET_DISH_REVIEWS}
      getRestaurant={GET_RESTAURANT}
      restaurantId={id}
    />
  })

  function DisplayRestaurant({ user }) {
    const { loading, error, data } = useQuery(GET_RESTAURANT, {variables: {yelp_id: id}});
  
    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;
    setNewDishes(data.restaurant.dishes)
    return(
      <>
        <h2 className='cityName'>{data.restaurant.address}</h2>
        <h1 className='restaurantName'>{data.restaurant.name}</h1>
        <div className='menuList'>
          <div className='menuHeader'>
            <h2 className='menuTitle'>Hot Menu</h2>
            {user.id && <button className='addNewDishButton' onClick={() => toggleModal()}>Add New Dish Review</button>}
            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              className="mymodal"
              overlayClassName="myoverlay"
              closeTimeoutMS={500}
            >
              {showForm && <NewDishReviewForm
                id={id}
                user={user}
                addDishToArray={addDishToArray}
                setShowForm={setShowForm}
                category={data.restaurant.categories}
                getRestaurant={GET_RESTAURANT}
                toggleModal={toggleModal} />}
              {showOldForm && <OldDishReviewForm
                id={id}
                oldDishObject={oldDishObject}
                user={user}
                setShowOldForm={setShowOldForm}
                getDishReviews={GET_DISH_REVIEWS}
                toggleModal={toggleModal} />}
            </Modal>
          </div>

          <div className='dishList'>
            {dishCards}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='restaurantPage'>
      <DisplayRestaurant user={user} />
    </div>
  )
}

export default Restaurant