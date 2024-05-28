import React from 'react'
import './Card.css'
import { NavLink } from 'react-router-dom'

const Card = ({ id, name, flagImg, continent }) => {
    return (
        <NavLink to={`/detail/${id}`}>
            <div className='divCard'>
                <div className='divTop'>
                    <div className='divImg'>
                        <img src={flagImg} alt="Country" className='imgCard' />
                    </div>
                    <div className='divTitles'>
                        <h4 className='title'>{name}</h4>
                        <h6 className='subtitle'>Continent: {continent}</h6>
                    </div>
                </div>
            </div>
        </NavLink>
  )
}

export default Card
