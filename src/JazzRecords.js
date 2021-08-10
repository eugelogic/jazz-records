import './JazzRecords.css';
import React, { useState, useEffect } from "react"
import axios from "axios"

function JazzRecords() {
  const [data, setData] = useState({ results: [] })
  const currentYear = new Date().getFullYear()
  const [query, setQuery] = useState(currentYear)
  const [url, setUrl] = useState(`/.netlify/functions/discogs?genre=Jazz&year=${query}`)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await axios(url)
        setData(result.data)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [url])

  function handleSubmit(el) {
    el.preventDefault()
    if (query.length === 0) return
    setUrl(`/.netlify/functions/discogs?genre=Jazz&year=${query}`)
  }

  function handleChange(el) {
    setQuery(el.target.value)
  }

  return (
    <div>
      <h1>Search Jazz Records Published by Year</h1>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <br />
      {isError && <p>Something went wrong :-/</p>}
      {isLoading ? (
        <p>Loading now: ...</p>
      ) : (
        <ul>
          {data.results.map(info => (
            <li key={info.id}>
              <a href={`https://www.discogs.com${info.uri}`} target="_blank" rel="noopener noreferrer">{info.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default JazzRecords;