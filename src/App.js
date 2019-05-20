import React, { Component } from 'react';
import './App.css';
import Cats from './components/Cats'
import CenterContainer from './components/CenterContainer'
import { connect } from 'react-redux'
import { getCats } from './actions/cats'

class App extends Component {

  componentDidMount() {
    // fire off the getCats action
    this.props.getCats()
  }

  // turn this into an action/eliminate as a method of App
  handleLikeClick = (event) => {
    let newStatus
    if (event.target.tagName === "IMG") {newStatus = "undecided"}
    else {newStatus =  event.target.className === "like-button" ? "liked" : "disliked"}
    const cats = this.props.cats.map(cat => {
      if (parseInt(cat.id) === parseInt(event.target.id) || cat.id == event.target.className) {
        const newCat = Object.assign({}, cat)
        newCat.status = newStatus
        return newCat
      } else {
        return cat
      }
    })
    this.setState({
      cats: cats
    })
  }

  render() {

    return (
      <div className="App">
        <Cats
          disliked={false}
          handleChangeOfHeart={this.handleLikeClick}
          cats={this.props.cats.filter(cat => cat.status === "liked")}
        />
        <CenterContainer
          handleLikeClick={this.handleLikeClick}
        />
        <Cats
          disliked={true}
          handleChangeOfHeart={this.handleLikeClick}
          cats={this.props.cats.filter(cat => cat.status === "disliked")}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    cats: state.cats
  })
}

// const mapDispatchToProps = dispatch => {
//   return ({
//     getCats: ()=>dispatch(getCats())
//   })
// }

export default connect(mapStateToProps, { getCats })(App);
//export default App
