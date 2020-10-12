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
    const { posts, dispatch } = data
    const post = posts[index];

    return (
      <div className={styles.item} style={style} key={index}>
        <Checker isChecked={post.isChecked} onChange={() => dispatch(changePostCheckedState(index))} />
        <Deleter onClick={() => dispatch(removePost(index))} />
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
          itemData={{ posts: this.props.posts, dispatch: this.props.dispatch }}
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

export default connect()(Posts)