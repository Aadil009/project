import React,{ Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';

  const styles = StyleSheet.create({
    map: {
      flex:2,
      backgroundColor:'#fff',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
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

   var markers = [{longitude:0, latitude:0}]
   var markerss = [{longitude:0, latitude:0}]
   for(var i=0;i<pdata.length;i++) {
     markers[i] = {longitude: Number(pdata[i].long),
           latitude: Number(pdata[i].lat)
          };
          if(i==0 || i==pdata.length-1){
            markerss[i] = {longitude: Number(pdata[i].long),
                  latitude: Number(pdata[i].lat)
                 };
                }
     }



   return (

     <MapView style={styles.map} initialRegion={{
      latitude:Number(pdata[0].lat),
      longitude:Number(pdata[0].long),
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
     }}
     
     showsUserLocation={false}>
     {markerss.map(marker => (<MapView.Marker
       coordinate={marker}
       pinColor='purple'
     />))
     }
     
     <MapView.Polyline
       coordinates={markers}
       strokeWidth={4}
       strokeColor="rgba(0,0,255,0.5)"/>
  
     {
   }

   </MapView>
   
   )
 };
 
 }
