import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, createActivity, getActivities, deleteActivities } from '../../redux/actions'
import validate from './validate'
import './Form.css'

const reload = () => {
  window.location.reload(false)
}

const Form = () => {
  const dispatch = useDispatch()
  const countriesName = useSelector(state => state.countries)
  const countriesOrder = countriesName.sort((a, b) => a.name.localeCompare(b.name))

  const theActivities = useSelector(state => state.activities)
  const activitiesOrder = theActivities.sort((a, b) => a.name.localeCompare(b.name))

  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countryId: []
  })

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const handleSelectCountries = e => {
    setInput({
      ...input,
      countryId: [...input.countryId, e.target.value]
    })
    setErrors(validate({
      ...input,
      countryId: [...input.countryId, e.target.value]
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errorSave = validate(input)

    const existName = theActivities.find(activity => activity.name.toLowerCase() === input.name.toLowerCase()) ? 1 : 0
    if (existName === 1) alert("Activity name already exists")
    else if (Object.values(errorSave).length !== 0) alert("You must fullfill all the required conditions")
    
    else {
      dispatch(createActivity(input))
      alert('Activity created')
      setInput({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countryId: []
      })
      reload()
    }
  }

  const [delAct, setDelAct] = useState('')
  console.log(delAct)
  
  const handleSelectDelete = e => {
    setDelAct(e.target.value)
  }

  const handleSubmitDelete = e => {
    e.preventDefault()
    if (delAct.length <= 0) {        
       alert('You must select an activity to delete')
    } else {
      dispatch(deleteActivities(delAct))
      alert('Activity deleted!')
      setDelAct('')
      reload()
    }
  }

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])

  useEffect(() => {
    dispatch(deleteActivities())
  }, [dispatch])

  return (
    <div className="contenedor">
      <div className="formContainer">
        <p className="titulo">Create your activity!</p>
        <form onSubmit={handleSubmit}>
          <div className="formField">
            <div className="unidos">
              <label className="label">Name: </label>
              <input
                className="formInputt"
                onChange={handleChange}
                type="text"
                value={input.name}
                name="name"
                placeholder="Activity name"
              />
            </div>
            {errors.name && <p className="formError">{errors.name}</p>}
          </div>

          <div className="formField">
            <label className="label">Difficulty: </label>
            <select className="formInput" value={input.difficulty} onChange={handleChange} name="difficulty">
              <option value="" disabled>
                Select
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.difficulty && (
              <p className="formError">{errors.difficulty}</p>
            )}
          </div>

          <div className="formField">
            <label className="label">Duration: </label>
            <select
              className="formInput"
              value={input.duration}
              onChange={handleChange}
              name="duration">
              <option value="" disabled>
                Select
              </option>
              <option value="1">1 hs</option>
              <option value="2">2 hs</option>
              <option value="3">3 hs</option>
              <option value="4">4 hs</option>
              <option value="5">5 hs</option>
              <option value="6">6 hs</option>
              <option value="7">7 hs</option>
              <option value="8">8 hs</option>
              <option value="9">9 hs</option>
              <option value="10">10 hs</option>
              <option value="11">11 hs</option>
              <option value="12">12 hs</option>
              <option value="13">13 hs</option>
              <option value="14">14 hs</option>
              <option value="15">15 hs</option>
              <option value="16">16 hs</option>
              <option value="17">17 hs</option>
              <option value="18">18 hs</option>
              <option value="19">19 hs</option>
              <option value="20">20 hs</option>
              <option value="21">21 hs</option>
              <option value="22">22 hs</option>
              <option value="23">23 hs</option>
              <option value="24">24 hs</option>
            </select>
            {errors.duration && <p className="formError">{errors.duration}</p>}
          </div>

          <div className="formField">
            <label className='label'>Season: </label>
            <select
              className='formInput'
              value={input.season}
              onChange={handleChange}
              name="season">
              <option value="" disabled>
                Select
              </option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </select>

            {errors.season && (
              <p className='formError'>{errors.season}</p>
            )}
          </div>

          <div className='formField'>
            <label className='label'>Country: </label>
            <select className='formInput' value='' onChange={handleSelectCountries}>
              <option value="" disabled>Select country</option>
              {countriesOrder.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
            {errors.countryId && <p className='formError'>{errors.countryId}</p>}
            <div>
              <ul className='elegidos'>
                <p>{input.countryId.map(countriesId_input => countriesName.map(countries_state => {
                  if (countries_state.id === countriesId_input) {
                    return countries_state.name + ', '
                  }
                }))}</p>
              </ul>
            </div>
          </div>

          <div>
            <button className='reload' type='submit' disabled={input.name === '' || input.difficulty === '' || input.duration === '' || input.season === '' || input.countryId.length<0 || errors.name || errors.difficulty || errors.duration || errors.season || errors.countryId}>Create</button>
          </div>
        </form>
      </div>

      <div className='formContainerdel'>
        <div>
          <p className='titulo'>Delete activity</p>
          <form onSubmit={handleSubmitDelete}>
            <div className='formField'>
              <div>
                <select className='formInputdel' value='' onChange={handleSelectDelete}>
                  <option value="" disabled>Activity</option>
                  {activitiesOrder && activitiesOrder.map(activity => {
                    return (
                      <option key={activity.name} value={activity.name}>{activity.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <p className='elegidos'>Activity to delete: {delAct}</p>

            <div>
              <button className='reload' type='submit' disabled={delAct === ''}>
                Delete
              </button>
            </div>
          </form>
        </div>
        <div>
          <button className='reloadd' onClick={reload}>Reset form</button>
        </div>
      </div>
    </div>
  );
}

export default Form
