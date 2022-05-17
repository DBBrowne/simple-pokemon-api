import { debugMode } from '../config/environment.js'
export default function(...message){
  debugMode && console.info(...message)
}