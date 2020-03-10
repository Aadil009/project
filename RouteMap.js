import React,{ Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MapView from 'react-native-maps';

  const styles = StyleSheet.create({
    map: {
    backgroundColor:'#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    },
  });

export default class RouteMap extends React.Component {
 
   state = {
   data:[{long:73.6,lat:18.5}]
   };

   posdata=0;
 
   componentDidMount() {
   
   }
 
   constructor() {
   super()
   }
 
 
   render() {
   const params = this.props.route.params;
    pdata = params.pdata;
    // const params1 = this.props.route.params;
    // sdata = params1.sdata;
   var markers = [{longitude:0, latitude:0}]
   for(var i=0;i<pdata.length;i++) {
     markers[i] = {longitude: Number(pdata[i].long),
           latitude: Number(pdata[i].lat)
          };
     }
    //  var title=[]
    //  for(var i=0;i<sdata.length;i++) {
    //   title[i] = {title: String(sdata[i].stopname)};
    //   }
   return (
     <MapView style={styles.map} initialRegion={{
      latitude:18.18,
      longitude:73.23,
      latitudeDelta: 1,
      longitudeDelta: 1,
      
      
 
     }}
     showsUserLocation={true}>
     {markers.map(marker => (<MapView.Marker
       coordinate={marker}
      //  title={title}
      // image={icons[marker.type] || icons.default}
     />))
     }
     <MapView.Polyline
       coordinates={markers}
       strokeWidth={4}
       strokeColor="rgba(0,0,255,0.5)"/>
  
     {
   }
   </MapView>)
 };
 
 }
