import React, { Component } from 'react';
import {connect} from 'react-redux';


class Search extends Component {
  state = {
    query: '',
    searchload: 'show',
    btnext: 'hide',
    waitload: 'hide',
    pagination: 8
  }

  componentDidMount(){
    console.log(this.props)
    if(this.props.state.data.length > 0){
      this.setState({
        btnext: 'show'
      })
    }else{
      this.setState({
        btnext: 'hide'
      })
    }
    
  }

  setQuery = (e) => {
    this.setState({
      query: e.target.value
    });

    this.props.searchQuery(e.target.value)
    //console.log(this.state.query)
  }

  searchQuery = async (e) => {
    //console.log(this.state.query)
    if(this.state.query === ''){
      return null
    }else{
      await this.props.fetchData(this.state.query, this.state.pagination, this.beforeLoad, this.afterLoad);
    }
    
  }

  beforeLoad = () => {
    //console.log(this.state)
    this.setState({
      searchload: 'hide',
      waitload: 'showresult'
    })
  }

  afterLoad = () => {
    //console.log(this.state)
    this.setState({
      btnext: 'show',
      searchload: 'show',
      waitload: 'hide'
    })
  }

  searchViaEnter = async (e) => {
     if(e.keyCode === 13){
      await this.props.fetchData(this.state.query, this.state.pagination, this.beforeLoad, this.afterLoad)
    }
  }

  nextResults = () => {
    this.props.fetchNext(this.props.queryWord, this.state.pagination)
  }

  changeColor = (e) => {
    if(e.target.classList.contains(undefined) || e.target.classList.contains('nocolor')){
      this.props.addActive(parseInt(e.target.dataset.index), this.props.state.data.length)
      this.props.addFavorite(this.props.state.data[e.target.dataset.index].images["480w_still"].url)

    }else if(e.target.classList.contains('yescolor')){
      this.props.removeActive(parseInt(e.target.dataset.index), this.props.state.data.length)
      //this.props.addActive(parseInt(e.target.dataset.index), this.props.state.data.length)
      let index = this.props.state.favlist.indexOf(this.props.state.data[e.target.dataset.index].images["480w_still"].url);
      if(index > -1){
        this.props.removeFavorite(index)
        console.log(index)
      }
    }
  }


  render() {
    //console.log(this.props.state)
     console.log(this.props.state.favlist)
    const images = this.props.state.data.length > 0 ? (
     this.props.state.data.map((item, index) => {
       return  <div key={index} className="image-wrapper">
                  <img  src={item.images["480w_still"].url}/>
                  <i data-index={index} data-color={this.props.state.colorzero} onClick={this.changeColor} className={"fas fa-heart " + this.props.shownList[index]}></i>
               </div>
     })
    ) : (
      null
    );

    // const nextButton = this.props.state.data.length > 0 ? (
    //     <button onClick={this.nextResults} className="nextbtn">Next</button>
    // ) : (
    //   null
    // );

    return (
      <div className="search-container">
        <div className="search-input">
          <input onChange={this.setQuery} onKeyUp={this.searchViaEnter} type="text" placeholder="Start searching for images!"/>
          <button onClick={this.searchQuery}>Search</button>
        </div>
        <div className={"search " + this.state.searchload}>
            {images}
        </div>
         <p className={this.state.waitload}>LOADING...</p>
        <button onClick={this.nextResults} className={"nextbtn " + this.state.btnext}>Next</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: async (query, pagination, beforeLoad, afterLoad) => {
      beforeLoad()
      const getData = await fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=h20Y5jKjyQXumGfT2asKUdo8dkaSCvwd&limit=8`)
      const data = await getData.json();
      await dispatch({
        type: 'fetch_data',
        payload: data
      })
      afterLoad()
    },

    fetchNext: async (query, pagination) => {
      const getData = await fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=h20Y5jKjyQXumGfT2asKUdo8dkaSCvwd&limit=8&offset=${pagination}`)
      const data = await getData.json();
      dispatch({
        type: 'fetch_next',
        payload: data
      })
    },

    addFavorite: (fav) => {
      dispatch({
        type: 'add_favorite',
        payload: fav
      })
    },

    removeFavorite: (fav) =>{
      dispatch({
        type: 'remove_favorite',
        payload: fav
      })
    }

     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
