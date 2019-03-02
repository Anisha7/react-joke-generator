import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryButton from './category-button'
// import { chuckNorrisJoke } from './jokes';


class App extends Component {
  constructor(props) {
    super(props)
    this.categories = ['Chuck Norris', 'Dad']
    this.state = {
      currCategory : null,
      currJoke: "",
    }

    // [{name:"Toys", selected: false}]

  }
  // calls map on category array (of strings)
  // map returns an array, takes a function as parameter
  // the parameter function transforms each item
  getCategories() {
    return this.categories.map((cat, i) => {
      let color = '#e59244'
      if (this.state.currCategory === cat) {
        color = 'rgb(45, 50, 174)'
      }
      return (<li key={cat}>
        <CategoryButton label={cat} style={{backgroundColor: color}} onClick={(e) => {
              console.log("Setting cur category to: ")
              console.log(cat)
              this.setState({ currCategory: cat })
              // setting state directly because setState won't work
              // Mitchell Please Help!
              this.state.currCategory = cat;
              console.log(this.state.currCategory)
              this.getJoke()
            }
          } 
        />
      </li>)
    })
  }

  getJoke() {
    console.log(this.state.currCategory)
    let cat = this.state.currCategory
    // this.chuckNorrisJoke()
    if (cat === 'Chuck Norris') {
      this.chuckNorrisJoke()
    } else if (cat === 'Dad') {
      this.dadJoke()
    }
  }

  chuckNorrisJoke() {
    let proxyURL = 'https://cors-anywhere.herokuapp.com/'
    let url = 'http://api.icndb.com/jokes/random?escape=javascript'
    fetch(proxyURL+url)
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                console.log(result.value.joke)
                this.setState({currJoke: result.value.joke})
            }
        ).catch((err) => { console.log(err.message) })
  }

  dadJoke() {
    let url = 'https://icanhazdadjoke.com/'
    fetch(url, {headers: {'Accept': 'application/json'}})
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                console.log(result.joke)
                this.setState({currJoke: result.joke})
            }
        ).catch((err) => { console.log(err.message) })
  }

  render() {
    // let joke = this.getJoke()
    // console.log(joke)
    // let joke = this.currJoke
    console.log("PRINTING RENDER JOKE")
    // console.log(joke)
    return (
      <div className="App">
        <h1> MAKE ME LAUGH! </h1>
        <p>Instructions: Each time you click the button, it will give you a new joke!</p>
        <ul className = "categoryList">
          {this.getCategories()}
        </ul>

        <p>{this.state.currJoke}</p>
      
      </div>
    );
  }
}

export default App;
