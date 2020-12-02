import {
  View, Text, Image, Button, StyleSheet
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"

import RNSelect from 'react-native-select-awesome';


const PERSONS = [
  {id: 1, name: 'Alexander', value: 'alexander'},
  {id: 2, name: 'Ethan', value: 'ethan'},
  {id: 3, name: 'Daniel', value: 'daniel'},
  {id: 4, name: 'Matthew', value: 'matthew'},
  {id: 5, name: 'Joseph', value: 'joseph'},
];


const itemCustom = {color: '#146eff' };

function Skip(props){
  return (
    <View>
      <Text> This is Skip</Text>
      <Text> {props.vsf.activeApplId.appl_id} </Text>
      <RNSelect 
          datas={PERSONS}
          placeholder="Select people"
          label="name"
          notFind="Opp... !"
          styleNotFind={{ textAlign: 'center' }}
          customItem={(item, _selectValue) => {
            return (
              <View style={{marginBottom: 10, backgroundColor: '#f00'}}>
                <Text onPress={() => _selectValue(item)}>{item.name}</Text>
              </View>
            )
          }}
        />
    </View>
  )
}

 
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    vsf: state.vsf
  }
}

export default connect(mapStateToProps, null)(Skip);