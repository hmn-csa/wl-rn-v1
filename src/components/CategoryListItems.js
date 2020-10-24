import {
  View, Text, Image
} from 'react-native'

import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import {  actChangeToDo } from "../actions";

export default function CategoryListItems(){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>hi</Text>
      <Image source= {YuaImage} style={{ width: 100, height:100}}/>
    </View>
  )

}