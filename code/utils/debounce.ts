import React, { useState } from "react"

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleInputChange = (event) => {
    const value = event.target.value
    debounce((value) => {
      setSearchTerm(value)
      // Perform search operation using the updated search term
    }, 500)
  }

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <p>Search term: {searchTerm}</p>
    </div>
  )
}

//防抖
function debounce(func, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
