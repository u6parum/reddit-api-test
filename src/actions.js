export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POSTS = 'GET_POSTS'
export const GET_RANDOM_POST = 'GET_RANDOM_POST'
export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const CHANGE_ITEM_CHECKED_STATE = 'CHANGE_ITEM_CHECKED_STATE'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const BACKUP_STATE = 'BACKUP_STATE'
export const RESTORE_STATE = 'RESTORE_STATE'

export function backupState() {
  return {
    type: BACKUP_STATE
  }
}

export function restoreState(state) {
  return {
    type: RESTORE_STATE,
    state
  }
}

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function removePost(idx) {
  return {
    type: REMOVE_ITEM,
    idx
  }
}

export function changePostCheckedState(idx) {
  return {
    type: CHANGE_ITEM_CHECKED_STATE,
    idx
  }
}

export function getPosts(subreddit) {
  return {
    type: GET_POSTS,
    subreddit
  }
}

export function addPost(post) {
  return {
    type: ADD_ITEM,
    post
  }
}

export function getRandomPost(subreddit) {
  return {
    type: GET_RANDOM_POST,
    subreddit
  }
}