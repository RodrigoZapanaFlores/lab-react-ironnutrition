import { Divider, Row, Button } from 'antd';
import FoodBox from './components/FoodBox';
import './App.css';
import AddFoodForm from './components/AddFoodForm';
import foods from './foods.json';
import { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [calories, setCalories] = useState(0);
  const [servings, setServings] = useState(1);
  const [foodArray, setFoodArray] = useState(foods);
  const [search, setSearch] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    foodArray.push({ name, calories, image, servings });
    setFoodArray([...foodArray]);
  };

  const handleDelete = (name) => {
    setFoodArray(foodArray.filter((f) => name !== f.name));
  };

  return (
    <div className="App container">
      <AddFoodForm
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        image={image}
        setImage={setImage}
        calories={calories}
        setCalories={setCalories}
        servings={servings}
        setServings={setServings}
      />

      <Button>Search / Hide</Button>

      <Divider> Search </Divider>

      <SearchBar search={search} setSearch={setSearch} />

      <Divider> Food List </Divider>

      {foodArray.length === 0 ? (
        <div className='no-more-items'> 
          <h3>Oops! Thre is no more content to show.</h3>
          <img src="https://cdn-icons-png.flaticon.com/512/594/594468.png" alt="no more items" />
        </div>
      ) : (
        <Row style={{ width: '100%', justifyContent: 'center' }}>
        {foodArray
          .filter((food) =>
            food.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((food) => (
            <FoodBox key={food.name} {...food} handleDelete={handleDelete} />
          ))}
      </Row>
      )}      
    </div>
  );
}

export default App;