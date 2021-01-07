import {
  View, Text, Image, ScrollView, Alert, FlatList, ActivityIndicator, SectionList
} from 'react-native'
import { Button } from 'react-native-paper';
import React, { useState, useEffect} from "react"
import { connect } from "react-redux"
import ContractDetail from '../components/ContractDetail'
import ContractDetailMap from '../components/ContractDetailMap'
import { styles, colors } from '../styles'


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

      <Button mode="outlined" onPress={handleMore}> more </Button>
    </ScrollView>
    )
  */
  // const [more ,setMore ] = useState(false)
  // const [len, setLen ] = useState(props.showlists.applIds.length)
  
  // useEffect(() => {    
  //   setMore(false)  
  //   console.log(more)
  // }, [more]);

  // const showmoreBtn = (len ,more) => {
  //   if (len > 10)
  //   return <Button mode="outlined" onPress={() => setMore(true)}> Xem Thêm </Button>
  // }

  // const showmore = () => {
  //   if (more)
  //   return <ScrollView >
  //     {
  //       props.showlists.applIds.slice(10, props.showlists.applIds.length-1).map(
  //         appl =>  <ContractDetailMap 
  //           key={appl}
  //           contractId={appl}
  //           navigation={props.navigation}
  //         />
  //       )
  //     }
  //   </ScrollView>
  // }
  

  
  if (props.showlists.isTodoClass & props.data !== null)
    return (
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
   else if (props.data !== null)
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


  
  

  
  else return (
    <View style={[styles.container, {alignItems: 'center'}]}>
      <Text>Loading ... </Text>
      <ActivityIndicator size={100} color={colors.primary}/> 
    </View>
  )

}

const mapStateToProps = (state, ownProps) => {
  return {
    showlists: state.showlists,
    data: state.data.data
  };
};



 
export default connect(mapStateToProps, null)(ListAppls);

