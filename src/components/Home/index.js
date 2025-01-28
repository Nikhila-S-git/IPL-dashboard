import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Teamcard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsData: [], isLoader: true}

  componentDidMount() {
    this.getTeamDetails()
  }

  getTeamDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const uppdatedData = teams.map(each => ({
      name: each.name,
      id: each.id,
      team_image_url: each.team_image_url,
    }))
    this.setState({teamsData: uppdatedData, isLoader: false})
  }

  render() {
    const {teamsData, isLoader} = this.state
    return (
      <div className="bg-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo"
          />
          <h1>IPL Dashboard</h1>
        </div>
        <ul className="list-container">
          {isLoader ? (
            <div testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            teamsData.map(eachItem => (
              <Teamcard cardDetails={eachItem} key={eachItem.id} />
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default Home
