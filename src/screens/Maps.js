import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
//import { MapView, Marker, PROVIDER_GOOGLE  } from 'expo'

import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { connect } from "react-redux";


function Maps(props) {

  //const listAppls = props.data.data.filter((appl) => {
  //  return props.showlists.includes(appl.appl_id)
  //})

  const listAppls = Object.values(props.data.data).filter((appl) => {
    return props.showlists.includes(appl.appl_id)
  })

  const listLat = listAppls.map(appl => appl.lat)
  const listLon = listAppls.map(appl => appl.lon)
  const meanLat = listLat.reduce(function(sum, pay){
    return sum = sum+pay;
  },0) / listAppls.length

  //const latDetal = (Math.max(listAppls.map(appl => appl.lat)) - Math.min(listAppls.map(appl => appl.lat))) / 2
  const latDetal = Math.max.apply(Math, listLat) - Math.min.apply(Math, listLat)  + 0.05
  const lonDetal = Math.max.apply(Math, listLon) - Math.min.apply(Math, listLon)  + 0.05

  const meanLon = listAppls.map(appl => appl.lon).reduce(function(sum, pay){
    return sum = sum+pay;
  },0) / listAppls.length


  return (
    <View style={styles.container}>
      <MapView  
        style={styles.mapStyle} 
        provider={PROVIDER_GOOGLE} 
        initialRegion={{
          latitude: meanLat,
          longitude: meanLon ,
          latitudeDelta: latDetal,
          longitudeDelta: lonDetal,
        }}
      >
      {
        listAppls.map(appl => 
          <Marker  
            coordinate = {{latitude:appl.lat, longitude: appl.lon}}
            key={appl.appl_id}
            onPress = {() => {
              Alert.alert(`This is a ${appl.appl_id}`)
              
              }}
            /> 
        )
      }
      
    </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

const mapStateToProps = (state, ownProps) => {
  return {
    showlists: state.showlists,
    data: state.data
  }
}

export default connect(mapStateToProps, null)(Maps);
