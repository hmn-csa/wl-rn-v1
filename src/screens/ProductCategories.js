import {
  View, Text, Image, TouchableOpacity, Alert, FlatList, StyleSheet
} from 'react-native'

import { Button } from 'react-native-paper';
import React, { useState, useEffect} from "react"
import { connect } from "react-redux"

import { actUpdateShowlist } from "../actions"

function ProductCategories(props) {
  //console.log(props.data.categoryProduct)
  const handleShow = (list) => {
    props.navigation.navigate('Portfolio',  { screen: 'List' });
    props.updateShowlist(list)
  }

  const moneyFormat = (n) => {
    return  n.toLocaleString().split(".")[0]
  }

  return (
    <View style={ styles.container }>
      <View style={styles.buttons}>
        <Button
            mode="outlined"
            onPress={() => props.navigation.navigate('Categories', { screen: 'Tree' })}
            style={styles.button}
        >
          Tree
        </Button>
        
        <Button
          mode="contained"
          onPress={() => props.navigation.navigate('Categories', { screen: 'Product' })}
          style={styles.button}
        >
          Product
        </Button>
      </View>

      <FlatList 
      data = {props.categoryProduct}
      horizontal={false}
      numColumns={2}
      renderItem={({item}) => {
        return (
          <TouchableOpacity style={styles.card} onPress={() => {handleShow(item.applIds)}}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{item.key}</Text>
            </View>
            <View style={{ padding:2,}}>
              
              <View style={[styles.row]}>
                <View style={[styles.box, {flex:1.3}]}>
                  <Text>Số lượng:</Text>
                </View>
                <View style={[styles.box, {flex:1}]}>
                  <Text>{item.case}</Text>
                </View>
              </View>

              <View style={[styles.row]}>
                <View style={[styles.box, {flex:1.3}]}>
                  <Text>Paid case:</Text>
                </View>
                <View style={[styles.box, {flex:1}]}>
                  <Text>{item.paidcase}</Text>
                </View>
              </View>

              <View style={[styles.row]}>
                <View style={[styles.box, {flex:1.3}]}>
                  <Text>Thanh toán:</Text>
                </View>
                <View style={[styles.box, {flex:1}]}>
                  <Text>{moneyFormat(item.paidamt)}</Text>
                </View>
              </View>

              <View style={[styles.row]}>
                <View style={[styles.box, {flex:1.3}]}>
                  <Text>Viếng thăm:</Text>
                </View>
                <View style={[styles.box, {flex:1}]}>
                  <Text>{item.visited}</Text>
                </View>
              </View>


              
            </View>
          </TouchableOpacity>
        )
      }}/>
    </View>
    )
  
}


const mapStateToProps = (state, ownProps) => {
  return {
    categoryProduct: state.category.categoryProduct,
    showlists: state.showlists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    }
  };
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
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
    margin: 2
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
   alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor:"white",
    flexBasis: '46%',
    marginHorizontal: 5,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage:{
    height: 120,
    width: 120,
    borderRadius:60,
    alignSelf:'center',
    borderColor:"#DCDCDC",
    borderWidth:3,
  },
  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  icon:{
    height: 20,
    width: 20, 
  },
  buttons: {
    flexDirection: 'row',
    padding: 2,
  },
  button: {
    margin: 2,
  },
});    
 
export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);

