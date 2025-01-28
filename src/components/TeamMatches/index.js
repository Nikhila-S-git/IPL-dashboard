import {Component} from 'react'

import {PieChart, Pie, Legend, Cell, Tooltip, LabelList} from 'recharts'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import {FaArrowLeft} from 'react-icons/fa'

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
    const {matchData, team_banner_url, latestMatchDetails, isLoading} =
      this.state
    const rechartsData = matchData.filter(item => item && item.matchStatus)
    let matchResults = {won: 0, lost: 0, drawn: 0}
    let pieData = []
    if (rechartsData.length > 0) {
      matchResults = rechartsData.reduce(
        (acc, curr) => {
          if (curr && curr.matchStatus === 'Won') {
            acc.won += 1
          }
          if (curr && curr.matchStatus === 'Lost') {
            acc.lost += 1
          }
          if (curr && curr.matchStatus === 'Drwan') {
            acc.drawn += 1
          }
          return acc
        },
        {won: 0, lost: 0, drawn: 0},
      )
      pieData = [
        {name: 'Won', value: matchResults.won},
        {name: 'Lost', value: matchResults.lost},
        {name: 'Drawn', value: matchResults.drawn},
      ]
    }
    console.log(matchResults)
    const colors = {Won: '#42f56c', Lost: '#f54842', Drawn: '#4287f5'}
    return (
      <div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="background-conatiner">
            <Link to="/">
              <button className="backBtn" type="button">
                <FaArrowLeft />
                Back
              </button>
            </Link>
            <img
              src={team_banner_url}
              className="team-banner"
              alt="team banner"
            />
            <h1>Latest Matches</h1>
            <Latestmatch details={latestMatchDetails} />
            <div>
              <ul className="bottom-conatiner">
                {matchData.map(eachItem => (
                  <Matchcard matchcardDetails={eachItem} />
                ))}
              </ul>
              <PieChart width={700} height={700}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  startAngle={0}
                  endAngle={360}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                  ))}
                  <LabelList dataKey="name" position="inside" />
                  <Tooltip />
                  <Legend />
                </Pie>
              </PieChart>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Teammatches
