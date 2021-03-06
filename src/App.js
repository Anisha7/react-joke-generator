import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CategoryButton from './category-button'
import InputField from './input-field';
// import { chuckNorrisJoke } from './jokes';

function isMaliciousString(val) {
  if (typeof val !== "string") {
      return true
  }
  
  let regex = /^[A-Za-z0-9\-\_]+/
  if (!val.match(regex)) {
      return true
  }

  let validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-@."
  for (let i = 0; i < val.length; i++) {
      if (!validChars.includes(val[i])) {
          return true
      }
  }

  return false
}


class App extends Component {
  constructor(props) {
    super(props)
    this.categories = ['Chuck Norris', 'Dad', 'Random', 'Geek', 'Ron Swanson', 'Startup Idea', 'Yo Momma', 'Buzzword', 'Kanye West', 'Star Wars', 'User Added Jokes']
    this.state = {
      currCategory : null,
      currJoke: "",
      userJokes: [],
    }

    // [{name:"Toys", selected: false}]

  }
  // calls map on category array (of strings)
  // map returns an array, takes a function as parameter
  // the parameter function transforms each item
  getCategories() {
    return this.categories.map((cat, i) => {
      let color = 'rgb(170, 55, 206)'
      if (this.state.currCategory === cat) {
        color = '#e59244'
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
    } else if (cat === 'Random') {
      this.randomJoke()
    } else if (cat === 'Geek') {
      this.geekJoke()
    } else if (cat === 'Ron Swanson'){
      this.ronSwansonJoke()
    } else if (cat === 'Startup Idea') {
      this.startupJoke()
    } else if (cat === 'Yo Momma') {
      this.yoMommaJoke()
    } else if (cat === 'Buzzword') {
      this.buzzwordJoke()
    } else if (cat === 'Kanye West') {
      this.kanyeJoke()
    } else if (cat === 'Star Wars') {
      this.starWarsJoke()
    } else if (cat === 'User Added Jokes') {
      this.userJoke()
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

  randomJoke() {
    let url = 'https://official-joke-api.appspot.com/random_joke'
    fetch(url)
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                let joke = result.setup + ' ' + result.punchline
                console.log(joke)
                this.setState({currJoke: joke})
            }
        ).catch((err) => { console.log(err.message) })
  }

  geekJoke() {
    let url = 'https://geek-jokes.sameerkumar.website/api'
    fetch(url)
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                let joke = result
                console.log(joke)
                this.setState({currJoke: joke})
            }
        ).catch((err) => { console.log(err.message) })
  }
  
  ronSwansonJoke() {
    let url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes'
    fetch(url)
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                let joke = result
                console.log(joke)
                this.setState({currJoke: joke})
            }
        ).catch((err) => { console.log(err.message) })
  }

  startupJoke() {
    let proxyURL = 'https://cors-anywhere.herokuapp.com/'
    let url = 'http://itsthisforthat.com/api.php?json'
    fetch(proxyURL+url)
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                let joke = result.this + ' for ' + result.that
                console.log(joke)
                this.setState({currJoke: joke})
            }
        ).catch((err) => { console.log(err.message) })
  }

  yoMommaJoke() {
    let proxyURL = 'https://cors-anywhere.herokuapp.com/'
    let url = 'https://api.yomomma.info/'
    fetch(proxyURL+url)
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                let joke = result.joke
                console.log(joke)
                this.setState({currJoke: joke})
            }
        ).catch((err) => { console.log(err.message) })
  }

  buzzwordJoke() {
    let proxyURL = 'https://cors-anywhere.herokuapp.com/'
    let url = 'https://corporatebs-generator.sameerkumar.website/'
    fetch(proxyURL+url)
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                let joke = result.phrase
                console.log(joke)
                this.setState({currJoke: joke})
            }
        ).catch((err) => { console.log(err.message) })
  }
  
  kanyeJoke() {
    let url = 'https://api.kanye.rest/'
    fetch(url)
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                let joke = result.quote
                console.log(joke)
                this.setState({currJoke: joke})
            }
        ).catch((err) => { console.log(err.message) })
  }

  starWarsJoke() {
    let proxyURL = 'https://cors-anywhere.herokuapp.com/'
    let url = 'http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote'
    fetch(proxyURL+url)
        .then(res => {
            console.log(res)
            return res.json()
        }).then(
            (result) => { 
                console.log(result)
                let joke = result.starWarsQuote
                console.log(joke)
                this.setState({currJoke: joke})
            }
        ).catch((err) => { console.log(err.message) })
  }

  userJoke() {
    let l = this.state.userJokes.length
    let i = Math.floor(Math.random()*l)
    this.setState({currJoke: this.state.userJokes[i]})
  }

  addJoke(joke) {
    if (!isMaliciousString(joke)) {
      this.state.userJokes.push(joke)
      console.log(this.state.userJokes)
    }
  }

  render() {
    
    return (
      <div className="App">
        <h1> MAKE ME LAUGH! </h1>
        <p>Instructions: Each time you click the button, it will give you a new joke!</p>
        <h2>{this.state.currJoke}</h2>
        <ul className = "categoryList">
          {this.getCategories()}
        </ul>

        <p> Add your own joke below: </p>
        <InputField addJoke={(joke) => this.addJoke(joke)} />
      
      </div>
    );
  }
}

export default App;
