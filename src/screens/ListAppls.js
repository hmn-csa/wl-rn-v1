import {
  View, Text, Image, ScrollView, Alert, FlatList, SectionList
} from 'react-native'
import { Button } from 'react-native-paper';
import React, { useState, useEffect} from "react"
import { connect } from "react-redux"
import ContractDetail from '../components/ContractDetail'
import ContractDetailMap from '../components/ContractDetailMap'
import { styles } from '../styles'



function ListAppls(props) {

  // console.log('show',props.showlists)style={ styles.container }
  /*
  return (
    <ScrollView >
      {
        props.showlists.applIds.slice(0, 40).map(
          appl => 
            <ContractDetail 
              key={appl}
              contractId = {appl}
              navigation={props.navigation}
            />
          )
      }

      <Button  mode="outlined" onPress={handleMore}> more </Button>
    </ScrollView>
    )
  */
  if (props.showlists.isTodoClass)return (
    <ScrollView >
      {
        props.showlists.applIds.map( appl => 
          <ContractDetailMap 
            key={appl}
            contractId={appl}
            navigation={props.navigation}
          />
        )
      }
    </ScrollView>
  )

  return (
    <FlatList 
    data = {props.showlists.applIds}
    renderItem={appl_id => 
      <ContractDetail 
        key={appl_id}
        contractId={appl_id}
        navigation={props.navigation}/>}
    />
  ) 

}

const mapStateToProps = (state, ownProps) => {
  return {
    showlists: state.showlists
  };
};



 
export default connect(mapStateToProps, null)(ListAppls);

