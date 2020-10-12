import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import Deleter from './Deleter'
import Checker from './Checker'
import styles from './Posts.module.scss'
import { changePostCheckedState, removePost } from '../actions'
import { connect } from 'react-redux'
import { FixedSizeList as List } from "react-window";

class ItemRenderer extends PureComponent {
  render() {
    const { data, style, index } = this.props
    const { posts, onPostCheckedStateChange, onRemovePost } = data
    const post = posts[index];

    return (
      <div className={styles.item} style={style} key={index}>
        <Checker isChecked={post.isChecked} onChange={() => onPostCheckedStateChange(index)} />
        <Deleter onClick={() => onRemovePost(index)} />
        <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">{post.title}</a>
      </div>
    );
  }
}

class Posts extends Component {
  render() {
    return (
        <List
          height={550}
          width={'100%'}
          itemCount={this.props.posts.length}
          itemData={{ 
            posts: this.props.posts, 
            onPostCheckedStateChange: this.props.onPostCheckedStateChange,
            onRemovePost: this.props.onRemovePost 
          }}
          itemSize={35}
        >
          { ItemRenderer }
        </List>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostCheckedStateChange: (idx) => {
      dispatch(changePostCheckedState(idx))
    },
    onRemovePost: (idx) => {
      dispatch(removePost(idx))
    }
  }
}

export default connect(null, mapDispatchToProps)(Posts)