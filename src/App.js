import React, { Component } from 'react';
import {connect} from 'react-redux';

class App extends Component {
  componentDidMount(){
    this.props.fetchData()
  }

  render() {
    console.log(this.props.data)
    return (
      <div className="App">
        {this.props.data[0].title}
        tes
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: async () => {
      const getData = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await getData.json();
      dispatch({
        type: 'fetch_data',
        payload: data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
