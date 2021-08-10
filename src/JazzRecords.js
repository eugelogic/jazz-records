import './JazzRecords.css';
import React, { useState, useEffect } from "react"
import axios from "axios"

function JazzRecords() {
  const [data, setData] = useState({ results: [] })
  const [url] = useState("/.netlify/functions/discogs")
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

  return (
    <div>
      <h1>Jazz Records Published in 2021</h1>
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