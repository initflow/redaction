import { applyMiddleware, compose, combineReducers, createStore as reduxCreateStore } from 'redux'
import thunk from 'redux-thunk'
import data from '../../lib/data'


const devTools = typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (v) => v

const defaultMiddleware = [
  thunk,
]

const defaultEnhancers = []

const createStore = ({
  initialState = {},
  reducers = {},
  resetStateOnActions = null,
  middleware = [],
  enhancers = [],
}) => {
  const finalMiddleware = [
    ...defaultMiddleware,
    ...middleware,
  ]

  const finalEnhancers = [
    ...defaultEnhancers,
    ...enhancers,
    devTools,
  ]

  const rootReducer = combineReducers(reducers)
  let wrapReducer = rootReducer;
  if (resetStateOnActions !== null && Array.isArray(resetStateOnActions)) {
    wrapReducer = (state, action) => {
      if (resetStateOnActions.indexOf(action.type) !== -1) {
        state = initialState
      }
      return rootReducer(state, action)
    }
  }

  const store = reduxCreateStore(
    wrapReducer,
    initialState,
    compose(
      applyMiddleware(...finalMiddleware),
      ...finalEnhancers,
    ),
  )

  data.store = store

  return store
}


export default createStore
