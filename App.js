import React from 'react';

 import MainStackNavigator from './MainStackNavigator'

 export default function App() {
   return <MainStackNavigator />
} 

// import React from 'react';
// import {
//   StyleSheet
// } from 'react-native';
// import MapView from 'react-native-maps'

// const LATITUDE_DELTA = 0.01;
// const LONGITUDE_DELTA = 0.01;

// const initialRegion = {
//   latitude: -37.78825,
//   longitude: -122.4324,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// }

// class MyMapView extends React.Component {

//   map = null;
//   state = {
//     ready: true,
//   };

//   setRegion(region) {
//     this.setState({ region });
//   }

//   componentDidMount() {
//     this.getCurrentPosition();
//   }

//   getCurrentPosition() {
//     try {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const region = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA,
//           };
//           this.setRegion(region);
//         },

//       );
//     } catch(e) {
//       alert(e.message || "");
//     }
//   }


//   render() {

//     const { region } = this.state;
//     const { children, renderMarker, markers } = this.props;
    

//     return (
       
//       <MapView style={styles.map}
      
//         showsUserLocation
//         ref={ map => { this.map = map }}
//         data={markers}
//         initialRegion={region}
//         renderMarker={renderMarker}
//         onMapReady={this.onMapReady}
//         showsMyLocationButton={true}
//         textStyle={{ color: '#bc8b00' }}
//         containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}>

//       </MapView>
//     );
   
//   }
// }
// const styles = StyleSheet.create({  

//     map: {
//       backgroundColor:'#fff',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       },
// });
// export default MyMapView;








