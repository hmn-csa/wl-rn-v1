
import { StyleSheet } from 'react-native'

const MAIN_COLOR1 = "#003f5c"
const MAIN_COLOR2 = "#fb5b5a"
const MAIN_COLOR3 = "#dee2e6"
const BACKGROUND_LOGIN =  '#003f5c'
const BACKGROUND_COLOR =  'white'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: BACKGROUND_COLOR, 
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 2
  },

  box2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  header: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
    margin: 8,
    justifyContent: 'center',
    color: MAIN_COLOR1,
  },
  header2: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    margin: 8,
    justifyContent: 'center',
    color: MAIN_COLOR1,
  },
  indexValue: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 35,
    paddingTop: 8,
    color: MAIN_COLOR1
  },
  indexValueSmall: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 12,
    color: MAIN_COLOR1
  },
  indexLabel: {
    textAlign: 'center', // <-- the magic
    fontSize: 10,
    paddingBottom: 12,
  },

  logo:{
    fontWeight:"bold",
    fontSize:25,
    color:MAIN_COLOR2,
    padding: 3,
  },
  sologan :{
    fontWeight:"bold",
    fontSize:50,
    color:MAIN_COLOR2,
    padding: 3,
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  // Login
  loginBtn:{
    width:"80%",
    backgroundColor:MAIN_COLOR1,
    borderRadius:50,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
  inputText:{
    height:50,
    color:"white"
  },

})



export {  
  styles,
  MAIN_COLOR1,
  MAIN_COLOR2,
  MAIN_COLOR3,
  BACKGROUND_LOGIN,
  BACKGROUND_COLOR,
}