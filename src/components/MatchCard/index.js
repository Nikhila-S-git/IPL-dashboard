import './index.css'

const Matchcard = props => {
  const {matchcardDetails} = props
  const {competing_team_logo, competing_team, matchStatus, result} =
    matchcardDetails
  return (
    <li className="container">
      <img
        src={competing_team_logo}
        className="team-logo"
        alt={`competing team ${competing_team}`}
      />
      <p>{competing_team}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}

export default Matchcard
