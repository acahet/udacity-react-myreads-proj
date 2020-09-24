import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchPage extends Component {
    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link style={{ cursor: 'pointer' }} className="close-search" to="/" />
                </div>
            </div>
        )
    }
}
