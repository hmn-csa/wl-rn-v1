
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 20,
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
  },

  header: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
    margin: 8,
    justifyContent: 'center',
    color: "#fb5b5a"
  },
  indexValue: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 35,
    paddingTop: 8,
  },
  indexValueSmall: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 12,
  },
  indexLabel: {
    textAlign: 'center', // <-- the magic
    fontSize: 10,
    paddingBottom: 12,
  },

  logo:{
    fontWeight:"bold",
    fontSize:25,
    color:"#fb5b5a",
    padding: 3,
  },
  
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:50,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
})

export default styles