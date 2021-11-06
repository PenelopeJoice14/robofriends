import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'; 
import ErrorBoundary from '../components/ErrorBoundary';

import './App.css';

import { setSearchfield } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchfield(event.target.value))
	}
}


function App() {
	const [ robots, setRobots ] = useState([]) //robots - the state, setRobots - the function that changes the state
	const [ searchfield, setSearchfield ] = useState('')
	const [ count, setCount ] = useState(0)

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => {setRobots(users)});
		console.log(count)
	}, [count]) //only run if count changes
	// useEffect gets run everytime function App() is run or after it is rendered without the [count]

	
	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})

	return !robots.length ?
	<h1>Loading</h1> :
	(	
		<div className="tc">
			<h1 className="f1">RoboFriends</h1>
			<button onClick={() => setCount(count+1)}>Click Me</button>
			<SearchBox searchChange={onSearchChange} />
			<Scroll>
				<ErrorBoundary> 
					<CardList robots={ filteredRobots } />
				</ErrorBoundary>
			</Scroll>
		</div>
	);
}

	
export default connect(mapStateToProps, mapDispatchToProps)(App);