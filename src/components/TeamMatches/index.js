import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Latestmatch from '../LatestMatch'

import Matchcard from '../MatchCard'

import './index.css'

class Teammatches extends Component {
  state = {
    matchData: [],
    team_banner_url: '',
    latestMatchDetails: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const matches = await response.json()
    const {latest_match_details, recent_matches, team_banner_url} = matches
    const latestMatchDetailsUpdated = {
      competingTeam: latest_match_details.competing_team,
      competing_team_logo: latest_match_details.competing_team_logo,
      date: latest_match_details.date,
      firstInnings: latest_match_details.first_innings,
      secondInnings: latest_match_details.second_innings,
      umpires: latest_match_details.umpires,
      manOfTheMatch: latest_match_details.man_of_the_match,
      result: latest_match_details.result,
      venue: latest_match_details.venue,
    }
    const url = team_banner_url
    console.log(url)
    const updatedMatchData = recent_matches.map(eachData => ({
      competing_team_logo: eachData.competing_team_logo,
      competing_team: eachData.competing_team,
      matchStatus: eachData.match_status,
      result: eachData.result,
    }))

    this.setState({
      matchData: updatedMatchData,
      team_banner_url: url,
      latestMatchDetails: latestMatchDetailsUpdated,
      isLoading: false,
    })
  }

  render() {
    const {
      matchData,
      team_banner_url,
      latestMatchDetails,
      isLoading,
    } = this.state
    return (
      <div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="background-conatiner">
            <img
              src={team_banner_url}
              className="team-banner"
              alt="team banner"
            />
            <h1>Latest Matches</h1>
            <Latestmatch
              details={latestMatchDetails}
              key={latestMatchDetails.id}
            />
            <ul className="bottom-conatiner">
              {matchData.map(eachItem => (
                <Matchcard
                  matchcardDetails={eachItem}
                  key={eachItem.competing_team}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Teammatches
