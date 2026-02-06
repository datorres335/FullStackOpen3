import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`
    if (name.length > 0) {
      console.log(url)
      axios.get(url).then(result => {
        const data = result.data[0]
        console.log(data)
        setCountry({
          found: true,
          data: {
            name: data.name.common,
            capital: data.capital[0],
            population: data.population,
            flag: data.flags.png
          }
        })
      }).catch(() => {
        setCountry({ found: false })
      })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>
      not found...
    </div>
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
  // return (
  //   <div>
  //     <h3>{country.name.common}</h3>
  //     <div>population {country.population}</div> 
  //     <div>capital {country.capital}</div>
  //     <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/> 
  //   </div>
  // ) 
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      {/* <Country country={country} /> */}
      {name.length > 0 && <Country country={country} />}
    </div>
  )
}

export default App