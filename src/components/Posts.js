import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import Deleter from './Deleter'
import Checker from './Checker'
import styles from './Posts.module.scss'
import { FixedSizeList as List } from "react-window";

class ItemRenderer extends PureComponent {
  render() {
    const { data, style, index } = this.props
    const { posts, onPostChecked, onPostRemoved } = data
    const post = posts[index];

    return (
      <div className={styles.item} style={style} key={index}>
        <Checker isChecked={post.isChecked} onChange={() => onPostChecked(index)} />
        <Deleter onClick={() => onPostRemoved(index)} />
        <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">{post.title}</a>
      </div>
    );
  }
}

class Posts extends Component {
  render() {
    const { posts, onPostChecked, onPostRemoved } = this.props
    return (
        <List
          height={550}
          width={'100%'}
          itemCount={posts.length}
          itemData={{ 
            posts, 
            onPostChecked,
            onPostRemoved
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

export default Posts