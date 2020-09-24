import React from 'react';
import { Route } from 'react-router-dom'

import './App.css';
import SearchPage from './components/SearchPage/SearchPage';
import LandingPage from './pages/LandingPage/LandingPage';

class BooksApp extends React.Component {
	

	render() {
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<LandingPage />
				)} />

				<Route exact path='/search' render={() => (
					<SearchPage />
				)} />
			</div>
		)
	}
}

export default BooksApp;
