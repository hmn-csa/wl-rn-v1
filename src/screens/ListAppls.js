import {
  View, Text, Image, ScrollView, Alert, FlatList, ActivityIndicator, Dimensions
} from 'react-native'
import { Button } from 'react-native-paper';
import React, { useState, useEffect} from "react"
import { connect } from "react-redux"
import ContractDetail from '../components/ContractDetail'
import ContractDetailMap from '../components/ContractDetailMap'

import Carousel from 'react-native-snap-carousel'
import { styles, colors } from '../styles'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4.5;


const SliderWidth = Dimensions.get('screen').width;


function ListAppls(props) {

  function toObject(arr) {
    var rv = [];
    for (var i = 0; i < arr.length; ++i)
      rv = [...rv, {appl_id: arr[i]}]
    return rv;
  }

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

  const [showappls, setShowappls] = useState(toObject(props.showlists.applIds))
  
  
  useEffect(() => {
    setShowappls(toObject(props.showlists.applIds))
  }, [props.showlists.applIds]);
  

  const _renderItem = ({ item, index }) => {
    return (
      <ContractDetailMap
        key={item.appl_id}
        contractId={item.appl_id}
        navigation={props.navigation}
      />
    );
  };

  

  // return <View 
  //   style={{ flexDirection: 'row'}}>
  //   <Carousel
  //     layout={'default'}
  //     data={showappls}
  //     sliderWidth={SliderWidth}
  //     itemWidth={width * 0.9}
  //     renderItem={_renderItem}
  //     useScrollView={false}
  //     activeSlideAlignment="center"
  //   />
  // </View>

  
  // if (props.showlists.isTodoClass & props.data !== null)
  //   return (
  //   <ScrollView >
  //     {
  //       showappls.map( appl => 
  //         <ContractDetailMap 
  //           key={appl}
  //           contractId={appl}
  //           navigation={props.navigation}
  //         />
  //       )
  //     }
 
  //   </ScrollView>
  // )
  if (props.data !== null)
    return (
      <FlatList 
      data = {showappls}
      keyExtractor={(appl) => appl}
      renderItem={_renderItem}
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

