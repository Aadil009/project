import React, { Component } from "react";  
import {TouchableHighlight,TouchableWithoutFeedback, StyleSheet, View, TextInput, Text, Alert ,Button, ScrollView} from "react-native";  
  

// class RouteLoc extends React.Component {
  
// 	 styles = StyleSheet.create({
// 	  map: {
// 		backgroundColor:'#fff',
// 		position: 'absolute',
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		bottom: 0,
// 	  },
// 	});
	
// 	  state = {
// 		data:[{long:73.6,lat:18.5}]
// 	  };

// 	  posdata=0;
	
// 	  componentDidMount() {
		
// 	  }
	
// 	  constructor(pdata) {
// 		super()
// 		posdata = pdata;
// 		//this.fetchData()
// 	  }
	
// 	//   fetchData = () => {
	
// 	// 	fetch("http://192.168.43.81:3000").then((response)=>{
// 	// 	if(response.ok) {
// 	// 	  response.json().then((json)=> {
// 	// 	  this.setState({ data: json.data.path });
// 	// 	  })
// 	// 	} else {
// 	// 	  console.log("SOMETHING WENT WRONG");
// 	// 	}
// 	//   })
// 	 // };
	
// 	  render() {
		
	   
// 		var markers = [{longitude:0, latitude:0}]
// 		console.log(pdata.length)
// 		for(var i=0;i<this.state.data.length;i++) {
// 		  markers[i] = {longitude: pdata[i].long,
// 						latitude: pdata[i].lat};
// 		  console.log(markers[i],pdata[i].long)
// 		  }
// 		return (
// 		  <MapView style={styles.map} initialRegion={{
// 		   latitude:0,
// 		   longitude:0,
// 		   latitudeDelta: 1,
// 		   longitudeDelta: 1,
		   
	
// 		  }}>
// 			{markers.map(marker => (<MapView.Marker
// 			  coordinate={marker}
// 			/>))
// 			}
// 			<MapView.Polyline
// 			  coordinates={markers}
// 			  strokeWidth={4}
// 			  strokeColor="rgba(0,0,255,0.5)"/>
	 
// 		  {
// 	  }
// 	  </MapView>)
// 	};
	
// 	}


export default class Home extends Component { 
	
	state = {
		data:[{long:73.6,lat:18.5}]
	  };
	
	navigation = 0;


	constructor() {
		super()
		//navigation = props;
		this.state = {
			AnswerText:'helloo all',
			routeData:[],
			stopsData:[],
			jsondata:0,
			TextInputValueSource: '',
			TextInputValueDestination: '',
			//super()
    		
			
		}
	}

	// clickMe(r){
	// 	console.log(r);
	// }

	GetValueFunction = () =>{
		let routes=[];
		let stops=[];
		let stoplat=[];
		let stoplong=[];
		this.setState({AnswerText:null});
		const { TextInputValueSource,TextInputValueDestination }  = this.state ;
		Alert.alert(TextInputValueSource+" "+TextInputValueDestination);
		fetch('http://192.168.43.81:5000/routes?src='+TextInputValueSource+'&dest='+TextInputValueDestination)
		.then((response) => response.json())
    			.then((responseJson) => {
    //  				console.log(responseJson);
    //  				this.setState({AnswerText:JSON.stringify(responseJson)});
      				responseJson.map((ele)=>routes.push(ele.route));
					  responseJson.map((ele)=>stops.push(ele.stops));
					  responseJson.map((ele)=>stoplat.push(ele.latitude));
					  responseJson.map((ele)=>stoplong.push(ele.longitude));
      				// console.log("longitude="+long);
      				console.log("Length of array is:"+routes.length);
      				// console.log(responseJson);
					  //this.setState({AnswerText:JSON.stringify(responseJson)});
					  this.setState({jsondata:responseJson})
					  //console.log(responseJson);
      				this.setState({routeData:routes});
					this.setState({stopsData:stops});
					//this.setState({stopsData:stoplat});
					//this.setState({stopsData:stoplong});
					//console.log(stops);
					// this.setState({lat:lat});
					// this.setState({long:long});
					//console.log(this.state.routesData);
    			})
    		.catch((error) => {
      			console.error(error);
    		});
		 }
		 

	render() {  
		let cnt=0;
		let textEle1=this.state.stopsData.map((s)=>{
			//console.log(s)kkljlk
		}
		);
		
		let textEles=this.state.routeData.map((r)=> {   
			//console.log(r);
			// <p>
			// 	<a onClick={this.clickMe.bind(this,r)}>
			//   for(var i=0;i<this.state.r.length;i++) {
			//  	console.log( "****"+r.latitude[i])
			// // 				  //latitude: this.state.r[i].latitudeDelta};
			// // 	console.log(markers[i],this.state.r[i].long)
			//  	 }
			// 	</a>
			// </p>
			return(<TouchableHighlight key={r} onPress={()=>{
				//Alert.alert("You clicked me!"+r);
				stopd = this.state.stopsData[this.state.routeData.indexOf(r)]
				pdata = []
				//console.log(, this.state.routeData.indexOf(r))
				for(var i=0;i<stopd.length;i+=3) {
					pdata.push({lat:stopd[i+1],long:stopd[i+2]})
				} 
				//console.log(pdata)
				this.props.navigation.navigate('RouteMap',{pdata:pdata})
				//navigator.navigate('RouteMap',{pdata:8})
			//console.log(r)
			
			}}>
      				<Text style={{textAlign:"center",fontSize:20,padding:20,color:'rgb(0,0,255)',backgroundColor: 'rgb(50,150,120)',margin:5}}>{r+":"+ ++cnt}</Text>
      			</TouchableHighlight>)});
		return (
		<ScrollView contentContainerStyle={styles.contentContainer}>  
      			<View style={styles.container}>  
        		<TextInput  
          			style={styles.textInputStyle}  
          			onChangeText={(TextInputValueSource) => this.setState({TextInputValueSource})}  
          			placeholder="enter source"  
          			placeholderTextColor="red"  
        		/>  
        		<TextInput  
          			style={styles.textInputStyle}  
          			onChangeText={(TextInputValueDestination) => this.setState({TextInputValueDestination})}  
          			placeholder="enter destination"  
          			placeholderTextColor="red"  
        		/>  
         		<Button title="Find Routes" onPress={this.GetValueFunction} color="#2196F3" />
         		<Text>{this.state.AnswerText}</Text>
         		{textEles}

      			{/*<TouchableHighlight onPress={()=>{Alert.alert("You clicked me!")}}>
      				<Text style={{textAlign:"center",fontSize:20,padding:50}}>Click me!!</Text>
      			</TouchableHighlight>*/}
  		</View>
      		</ScrollView>  
			);  
			

// 			var markers = [{longitude:0, latitude:0}]
//     console.log(this.state.r.length)
//     for(var i=0;i<this.state.r.length;i++) {
//       markers[i] = {longitude: this.state.r[i].longitude,
//                     latitude: this.state.r[i].latitudeDelta};
//       console.log(markers[i],this.state.r[i].longitude)
//       }
//     return (
//       <MapView style={styles.map} initialRegion={{
//        latitude:0,
//        longitude:0,
//        latitudeDelta: 1,
//        longitudeDelta: 1,
       

//       }}>
//         {markers.map(marker => (<MapView.Marker
//           coordinate={marker}
//         />))
//         }
//         <MapView.Polyline
//           coordinates={markers}
//           strokeWidth={4}
//           strokeColor="rgba(0,0,255,0.5)"/>
 
//       {
//   }
//   </MapView>)
  	}  
}  
  
const styles = StyleSheet.create({  
	container: {  
    		flex: 1,
    		padding:20  
	  },
	  contentContainer: {
		paddingVertical: 20
	  },
	  map: {
		backgroundColor:'#fff',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	  },  
  	textInputStyle: {  
    		borderColor: '#9a73ef',  
    		borderWidth: 1,  
    		height: 40,  
    		margin: 20,  
    		padding: 10,  
  	},  
  	textOutputStyle: {  
    		fontSize: 20  
  	}  
})  
  
