import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
//import { MapView, Marker, PROVIDER_GOOGLE  } from 'expo'
import { Button, Dialog, Portal, } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions, ScrollView, FlatList } from 'react-native';
import { connect } from "react-redux";
import { styles as masterStyle, BACKGROUND_LOGIN } from '../styles'
import ContractDetail from '../components/ContractDetail'


function Maps(props) {

  //const listAppls = props.data.data.filter((appl) => {
  //  return props.showlists.includes(appl.appl_id)
  //})

  const listAppls = Object.values(props.data).filter((appl) => {
    return props.showlists.applIds.includes(appl.appl_id)
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

  const [visible, setVisible] = useState(false);
  const [appl_id, setAppl_id] = useState(listAppls[0].appl_id);
  
  const showDialog = () => {
    setVisible(true)
  };
  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text>{appl_id}</Text>
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
            onPress = {() => {setAppl_id(appl.appl_id); showDialog()}}
            /> 
        )
      }
      
    </MapView>

    <Dialog style={{height:250,}} visible={visible} onDismiss={hideDialog}>
      <FlatList 
        data = {[appl_id]}
        renderItem={appl_id => 
          <ContractDetail 
            key={appl_id}
            contractId={appl_id}
            navigation={props.navigation}/>}
      />
      
      <Dialog.Actions>
        <Button onPress={hideDialog}>Done</Button>
      </Dialog.Actions>
    </Dialog>
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
    data: state.data.data,
    token: state.token,
    vsf: state.vsf
  }
}

export default connect(mapStateToProps, null)(Maps);
