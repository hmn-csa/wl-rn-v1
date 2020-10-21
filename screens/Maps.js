import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { connect } from "react-redux";


function Maps(props) {

  const listAppls = props.data.data.filter((appl) => {
    return props.showlists.includes(appl.appl_id)
  })

  const meanLat = listAppls.map(appl => appl.lat).reduce(function(sum, pay){
    return sum = sum+pay;
  },0) / listAppls.length

  const maxLat = listAppls.map(appl => appl.lat).max

  const meanLon = listAppls.map(appl => appl.lon).reduce(function(sum, pay){
    return sum = sum+pay;
  },0) / listAppls.length

  const mean_lat = listAppls
  return (
    <View style={styles.container}>
      <MapView  
        style={styles.mapStyle} 
        initialRegion={{
          latitude: meanLat,
          longitude: meanLon ,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {
        listAppls.map(appl => 
          <Marker  
            coordinate = {{latitude:appl.lat, longitude: appl.lon}}
            key={appl.appl_id}/> 
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
