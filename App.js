import React,{ Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
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

export default class App extends React.Component {

  state = {
    data:[{long:73.6,lat:18.5}]
  };

  componentDidMount() {
    
  }

  constructor() {
    super()
    this.fetchData()
  }

  fetchData = () => {

    fetch("http://192.168.43.81:3000").then((response)=>{
    if(response.ok) {
      response.json().then((json)=> {
      this.setState({ data: json.data.path });
      })
    } else {
      console.log("SOMETHING WENT WRONG");
    }
  })
  };

  render() {
    
   
    var markers = [{longitude:0, latitude:0}]
    console.log(this.state.data.length)
    for(var i=0;i<this.state.data.length;i++) {
      markers[i] = {longitude: this.state.data[i].long,
                    latitude: this.state.data[i].lat};
      console.log(markers[i],this.state.data[i].long)
      }
    return (
      <MapView style={styles.map} initialRegion={{
       latitude:0,
       longitude:0,
       latitudeDelta: 1,
       longitudeDelta: 1,
       

      }}>
        {markers.map(marker => (<MapView.Marker
          coordinate={marker}
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

