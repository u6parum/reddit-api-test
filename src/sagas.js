import {
    all,
    call,
    put,
    select,
    takeEvery,
    takeLeading
} from 'redux-saga/effects'
import {
    GET_POSTS,
    requestPosts,
    receivePosts,
    GET_RANDOM_POST,
    addPost,
    BACKUP_STATE,
    RESTORE_STATE,
    restoreState,
    backupState
} from './actions'
import { POSTS_CACHE_LIFETIME_MIN } from './containers/AsyncApp'
import { getDatesIntervalInMinutes } from './helpers'



function* getPostsSagaWatcher() {
    yield takeEvery(GET_POSTS, getPostsSaga)
}

function* getPostsSaga({
    subreddit
}) {
    yield put(requestPosts(subreddit))
    const result = yield call(fetchPosts, subreddit)
    yield put(receivePosts(subreddit, result))
}

async function fetchPosts(subreddit) {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
    return await response.json()
}



function* getRandomPostSagaWatcher() {
    yield takeEvery(GET_RANDOM_POST, getRandomPostSaga)
}

function* getRandomPostSaga({
    subreddit
}) {
    const postsBySubreddit = yield select((state) => state.postsBySubreddit[subreddit])
    let randomPost = {} 

    if (shouldFetchPosts(postsBySubreddit)) {
        yield call(getPostsSaga, {
            subreddit
        })
        const newPostsBySubreddit = yield select((state) => state.postsBySubreddit[subreddit])
        randomPost = getRandomPost(newPostsBySubreddit.items)
    } else {
        randomPost = getRandomPost(postsBySubreddit.items)
    }

    yield put(addPost(randomPost))
}

function getRandomPost(posts) {
    return posts[+(Math.random() * (posts.length - 1)).toFixed()]
}

function shouldFetchPosts(postsBySubreddit) {
    if (!postsBySubreddit) {
        return true
    } else if (postsBySubreddit.isFetching) {
        return false
    } else if (getDatesIntervalInMinutes(postsBySubreddit.lastUpdated, Date.now()) >= POSTS_CACHE_LIFETIME_MIN) {
        return true
    } else {
        return postsBySubreddit.didInvalidate
    }
}



function* saveStateSagaWatcher() {
    yield takeLeading(BACKUP_STATE, saveStateSaga)
}

function* saveStateSaga() {
    const currentState = yield select((state) => state)
    saveState(currentState)
    yield put(backupState())
}

function* restoreStateSagaWatcher() {
    yield takeLeading(RESTORE_STATE, restoreStateSaga)
}

function* restoreStateSaga() {
    yield put(restoreState(getState()))
}

function getState() {
    try {
        const state = window.localStorage.getItem("state")
        return JSON.parse(state)
    } catch (e) {
        console.error('Cannot restore state.', e.message)
    }
    return {}
}

function saveState(state) {
    try {
        window.localStorage.setItem("state", JSON.stringify(state))
    } catch (e) {
        console.error('Cannot save state.', e.message)
    }
}


export default function* rootSaga() {
    yield all([
        restoreStateSagaWatcher(),
        getPostsSagaWatcher(),
        getRandomPostSagaWatcher(),
        saveStateSagaWatcher(),
    ])
}