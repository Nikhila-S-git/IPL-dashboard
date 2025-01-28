import './index.css'

const Latestmatch = props => {
  const {details} = props
  const {
    competing_team,
    competing_team_logo,
    date,
    firstInnings,
    id,
    manOfTheMatch,
    result,
    secondInnings,
    umpires,
    venue,
  } = details
  return (
    <div className="latestContainer">
      <li>
        <p>{competing_team}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </li>
      <li>
        <img
          src={competing_team_logo}
          className="team-logo"
          alt={`latest match ${competing_team}`}
        />
      </li>
      <li>
        <p>First Innings</p>
        <p>{firstInnings}</p>
        <p>Second Innings</p>
        <p>{secondInnings}</p>
        <p>Man Of The Match</p>
        <p>{manOfTheMatch}</p>
        <p>Umpires</p>
        <p>{umpires}</p>
      </li>
    </div>
  )
}

export default Latestmatch
