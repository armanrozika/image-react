import React, { Component } from 'react';
import {NavLink, Route} from 'react-router-dom'

import Favourites from './components/favourites'
import Search from './components/search'

class App extends Component {

  state = {
    active: 0,
    shown: [],
    shownlist: [],
    searchquery: ''
  }

  componentDidMount(){
    
  }

  removeActive = (item ,len)=> {
    if(this.state.shown.length > 0){
      let index = this.state.shown.indexOf(item)
      if(index > -1){
        this.state.shown.splice(index, 1)
      }
      //this.state.shown.pop()
    }

    let arr = []
    for(let i=0; i<len; i++){
      arr.push("nocolor")
    }

    for(let i=0; i<this.state.shown.length; i++){
      if(arr[this.state.shown[i]] === undefined){
         arr[this.state.shown[i]] = "yescolor"
      }else if(arr[this.state.shown[i]] === "yescolor"){
         arr[this.state.shown[i]] = "nocolor"
      }else if(arr[this.state.shown[i]] === "nocolor"){
         arr[this.state.shown[i]] = "yescolor"
      }
     
    }

    this.setState({
      shownlist: arr,
      active: this.state.shown.length
    })
    console.log(this.state)
  }

  setActive = async (item, len) => {
    await this.setState({
      shown: [...this.state.shown, item]
    });

    let arr = []
    for(let i=0; i<len; i++){
      arr.push("nocolor")
    }

    for(let i=0; i<this.state.shown.length; i++){
      if(arr[this.state.shown[i]] === undefined){
         arr[this.state.shown[i]] = "yescolor"
      }else if(arr[this.state.shown[i]] === "yescolor"){
         arr[this.state.shown[i]] = "nocolor"
      }else if(arr[this.state.shown[i]] === "nocolor"){
         arr[this.state.shown[i]] = "yescolor"
      }
     
    }

    this.setState({
      shownlist: arr,
      active: this.state.shown.length
    })
  }

  searchQuery = (query) =>{
    this.setState({
      searchquery: query
    })
  }

  refreshPage = () => {
    //refresh to homepage
    window.location.href = "http://localhost:3000"
  }

  render() {
    //console.log(this.state)
    return (
      <div className="App">
        <nav>
          <p onClick={this.refreshPage}>Galler<span>Easy</span></p>
          <NavLink exact={true} activeClassName="is-active" to="/">Search</NavLink>
          <NavLink activeClassName="is-active" to="/favourites">Favourites({this.state.active})</NavLink>
        </nav>
       <Route exact path="/" render={(props) => <Search {...props} removeActive={(item, len) => this.removeActive(item,len)} queryWord={this.state.searchquery} addActive={(item, len) => this.setActive(item, len)}  isShown={this.state.shown} shownList={this.state.shownlist} searchQuery={(query) => this.searchQuery(query)} />}></Route>
       <Route path="/favourites" component={Favourites}></Route>
       <div className="footer">
        <p>Gallereasy POC webapp</p>
        <p>2359 media</p>
       </div>
      </div>
    );
  }
}


export default App;
