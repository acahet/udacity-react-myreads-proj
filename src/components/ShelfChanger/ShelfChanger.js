import React from 'react'

export default function SelectShelf({value, onChange}) {
    return (
            <select value={value} onChange={onChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
    )
}