import React from "react"

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#3D5AFE',
    backgroundColor: '#0F1B37',
    borderRadius: 4,
    width: 120,
    height: 100,
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 0.8,
    flexDirection: 'column',
  },
  header: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    flex: 0.5,
  },
  status: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  content:{
    flex: 0.5,
  },
  dot: {
    backgroundColor: '#3FE77B',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    color: '#FFF',
    fontSize: 10,
    letterSpacing: 0.29,
  },
  subText: {
    color: '#B1BCFD',
    fontSize: 10,
    letterSpacing: 0.29,
    paddingTop: 5,
  }
})

export default function Test(props) {

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row'}}
      >
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <View style={styles.icon}>
  
              </View>
              <View style={styles.status}>
                <View style={styles.dot}/>
              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>xxx</Text>
              <Text style={styles.subText}>100 verions</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
