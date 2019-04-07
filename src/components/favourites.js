import React from 'react';
import {connect} from 'react-redux';

const Favourites = (props)=> {
	console.log(props)
	const favImg = props.state.favlist.length > 0 ? (
		props.state.favlist.map((image, index) => {
			return <img key={index} src={image}/>
		})
	) : (
		null
	)
	return (
		<div className="favourites">
			<div className="search">
				{favImg}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		state: state
	}
}

export default connect(mapStateToProps)(Favourites);