import {combineReducers} from 'redux'
import main from '../reducers/main'
import main from '../reducers/addBounty'

const rootReducer = combineReducers({
  main,
  addBounty
})

export default rootReducer