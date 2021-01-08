import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

const SliderWidth = Dimensions.get('screen').width;

export default function Test() {
  const [activeIndex, setActivateIndex] = useState(0); 
  const [carouselState, setCarouselState] = useState([
        {
          title: 'Item 1',
          text: 'Text 1',
        },
        {
          title: 'Item 2',
          text: 'Text 2',
        },
        {
          title: 'Item 3',
          text: 'Text 3',
        },
        {
          title: 'Item 4',
          text: 'Text 4',
        },
        {
          title: 'Item 5',
          text: 'Text 5',
        },
      ],
    );

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          height: 20,
          padding: 50,
        }}>
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </TouchableOpacity>
      
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'rebeccapurple', paddingTop: 50 }}>
      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
          layout={'default'}
          data={carouselState}
          sliderWidth={SliderWidth}
          itemWidth={300}
          renderItem={_renderItem}
          useScrollView
          onSnapToItem={(index) => setActivateIndex(index)}
          activeSlideAlignment="center"
        />
      </View>
      <Text>{activeIndex}</Text>
    </SafeAreaView>
  );
  
}