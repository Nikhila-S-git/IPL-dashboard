import {Link} from 'react-router-dom'

import './index.css'

const Teamcard = props => {
  const {cardDetails} = props
  const {name, team_image_url, id} = cardDetails
  return (
    <Link to={`/team-matches/${id}`}>
      <li className="card-container">
        <img src={team_image_url} className="team-logo" alt={name} />
        <p className="para">{name}</p>
      </li>
    </Link>
  )
}

export default Teamcard
