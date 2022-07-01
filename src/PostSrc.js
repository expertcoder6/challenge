import { View, Text, FlatList, StatusBar, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import axios from 'axios'
import style from './style'
import Ionicon from 'react-native-vector-icons/Ionicons';
import FilterData from './component/FilterData'

export default function PostSrc() {

  const [getData, setData] = useState('')
  const [hide, setHide] = useState(false)
  const [sortData, setSortData] = useState(false)
  const headerImage = require('./assats/curve-header.png')

  useEffect(() => {
    // console.log('sdklfdj')
    axios({
      method: 'get',
      url: 'http://205.134.254.135/~mobile/interview/public/api/restaurants_list',
    }).then((response) => {
      // console.log('line_36', response.data?.data.map(i => i.title));
      setData(response?.data?.data)
    }).catch((err) =>
      console.log(err));
  }, [])

  function filter() {
    hide == false ?
      setHide(true)
      :
      setHide(false)
  }

  //Number sorting
  function sortByRating(value) {
    const rateSort = value.sort(function (a, b) {
      if (a.rating < b.rating) { return -1; }
      if (a.rating > b.rating) { return 1; }
      return 0;
    })
    setData(rateSort);
  }

  //alphabet sorting
  function sortByName(value) {
    const nameSort = value.sort(function (a, b) {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    })
    setData(nameSort);
  }

  function renderItem(i) {
    return (
      <TouchableOpacity style={styles.flatContainer}>
        <View tyle={styles.flatView}>
          <Image
            source={i?.item?.images}
            style={styles.flatImage} />
          <View style={styles.flatTextView}>
            <Text style={styles.flatTitle}>{i?.item?.title}</Text>
            <View style={styles.flatRatingView}>
              <Text style={styles.flatRatingText}>{i?.item?.rating}</Text>
              <Text style={styles.flatRatingicon}> ★</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={headerImage}
        style={styles.imageBackground} >
        <View style={styles.imageBackgroundView}>
          <Text onPress={() => setSortData(
            sortData == false ?
              setSortData(true)
              :
              setSortData(false)
          )} style={{
            fontSize: 24,
            color: 'white',
            fontWeight: '700',
          }}>Challange</Text>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => filter()}>
              <Image
                style={styles.icon}
                source={{ uri: 'https://img.icons8.com/ios/2x/empty-filter.png' }}
              />
            </TouchableOpacity>

          </View>
        </View>

      </ImageBackground>

      <View style={styles.flatListView} >
        <FlatList
          style={styles.flatList}
          data={getData}
          renderItem={(i) =>
            renderItem(i)
          }
        />
      </View>
      {
        hide ?
          <View
            style={styles.filter}>
            <FilterData onpress={() => { setHide(false), sortByName(getData) }} onpress1={() => { setHide(false), sortByRating(getData) }} />
          </View>
          :
          <View />
      }
    </View>
  )
}

const styles = StyleSheet.create({

  container: { flex: 1 },
  filter: {
    width: 100,
    top: 220,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', marginTop: 30,
    backgroundColor: '#DBE2F1',
    borderRadius: 10
  },
  flatList: {
    height: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40
  },
  imageBackground: {
    height: 310, width: "100%",
    borderRadius: 20,
    alignItems: 'center',
    paddingBottom: 70,
  },
  imageBackgroundView: {
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  icon: { width: 30, height: 30, tintColor: 'white' },
  flatListView: { flex: 1 },

  //renderItem

  flatContainer: {
    backgroundColor: '#FFDBE3',
    margin: 15,
    height: 250,
    borderRadius: 20
  },
  flatView:{
    backgroundColor: '#FFDBE3',
    height: '100%', 
    borderRadius: 20
  },
  flatImage:{
    height: 190, width: "100%",
    borderRadius: 20,
  },
  flatTextView:{ flexDirection: 'row', alignItems: 'center', margin: 14, top: 8 },
  flatTitle:{ color: '#3E0311', fontSize: 20, width: '60%', lineHeight: 20, },
  flatRatingView:{ flexDirection: 'row', width: '40%', justifyContent: 'flex-end' },
  flatRatingText:{ color: '#C9234A', fontSize: 18, },
  flatRatingicon:{ color: '#FFFF8F', fontSize: 18, textAlign: 'center' }

})