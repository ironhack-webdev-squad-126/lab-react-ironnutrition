import React from "react";
import FoodBox from "./FoodBox";
import Search from "./Search";
import foods from "../foods.json";

class Foods extends React.Component {
  state = {
    form: false,
    foodName: "",
    foodImg: "",
    calories: 0,
    foods,
    filtered: foods,
    today: []
  };
  handleClick = () => {
    this.setState({
      form: true
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const foods = this.state.foods.slice();
    const { foodName, foodImg, calories } = this.state;
    foods.unshift({
      name: foodName,
      image: foodImg,
      calories
    });

    this.setState({
      form: false,
      foods
    });
  };

  filterFood = input => {
    const filtered = this.state.foods.filter(el =>
      el.name.toLowerCase().includes(input.toLowerCase())
    );
    this.setState({ filtered });
  };

  addFood = food => {
    let today = this.state.today.slice();
    let found = today.find(el => el.name === food.name);

    food.calories *= food.quantity;

    if (found) {
      found.quantity += food.quantity;
      found.calories += food.calories;
    } else {
      today.push(food);
    }

    this.setState({
      today
    });
  };

  render() {
    const totalCalories = this.state.today.reduce(
      (acc, val) => acc + val.calories,
      0
    );

    return (
      <div>
        <Search filterFood={this.filterFood} />
        <button onClick={this.handleClick}>Add Food</button>
        {this.state.form && (
          <form onSubmit={this.handleSubmit}>
            <input
              className="input"
              onChange={this.handleChange}
              name="foodName"
              type="text"
              value={this.state.foodName}
              placeholder="tomato"
            />
            <input
              className="input"
              onChange={this.handleChange}
              type="number"
              name="calories"
              value={this.state.calories}
              placeholder="tomato"
            />
            <input
              className="input"
              onChange={this.handleChange}
              name="foodImg"
              type="text"
              value={this.state.foodImg}
              placeholder="https://i.imgur.com/5ktcSzF.jpg"
            />
            <input type="submit" value="add" />
          </form>
        )}
        <div>
          <div style={{ width: "70%", float: "left" }}>
            {this.state.filtered.map((el, i) => (
              <FoodBox key={i} food={el} addFood={this.addFood} />
            ))}
          </div>
          <div style={{ width: "30%", float: "right" }}>
            <h2>Today's food</h2>
            <ul>
              {this.state.today.map((el, i) => {
                return (
                  <li key={i}>
                    {el.quantity} {el.name} = {el.calories} cal
                  </li>
                );
              })}
              <p>Total: {totalCalories} calories</p>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Foods;
