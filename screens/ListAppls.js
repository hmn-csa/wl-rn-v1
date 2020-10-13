import {
  View, Text, Image, ScrollView
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"


import ShowAppl from '../components/ShowAppl'



function ListAppls(props) {
  return (
    <ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {
          props.appls.filter((appl) => {
            return props.showlists.includes(appl.appl_id)
          }).map(appl => 
            { return <ShowAppl noteData = {appl} key={appl.appl_id}/> }
          )
        }
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    appls: state.appls,
    showlists: state.showlists
  };
};


 
export default connect(mapStateToProps, null)(ListAppls);

