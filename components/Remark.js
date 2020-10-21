import {
  View, Text, Image, Button, StyleSheet
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"


function Remark(props){
  return (
    <View>
      <Text> This is Remark</Text>
      <Text> {props.vsf.activeApplId.appl_id} </Text>
    </View>
  )
}

 
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    vsf: state.vsf
  }
}

export default connect(mapStateToProps, null)(Remark);