import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  getRandomPost, 
  backupState, 
  restoreState
} from '../actions'
import Posts from '../components/Posts'
import Button from '../components/Button'

export const POSTS_CACHE_LIFETIME_MIN = 2

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentDidMount() {
    window.onload = (e) => {
      this.props.dispatch(restoreState())
    };

    window.onbeforeunload = (e) => {
      this.props.dispatch(backupState())
      e.preventDefault()
      e.returnValue = ''
    };
  }

  componentDidUpdate(prevProps) {}

  handleButtonClick(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(getRandomPost(nextSubreddit))
  }

  render() {
    const { items, isFetching } = this.props

    const buttons = ["Frontend", "React", "Angular", "Vue"].map((i) => 
      <div style={{position: 'relative', height: 35}} key={i}>
        <Button text={i} onClick={this.handleButtonClick} disabled={isFetching} />
      </div>
    )

    return (
      <div 
        style={
          {
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-around'
          }
        }
      >
        <div>{ buttons }</div>
        <div>
          <Posts posts={ items } />
        </div>
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit, items } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
      isFetching: false,
      items: []
    }

  return {
    items,
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)