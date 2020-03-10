import React, { Component } from "react";  
import MapView from 'react-native-maps'

import {TouchableHighlight,TouchableWithoutFeedback, StyleSheet, View, TextInput, Text, Alert ,Button, ScrollView} from "react-native";  


const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default class Home extends Component { 
	map = null;
	
	state = {
		data:[{long:73.6,lat:18.5}],
		ready: true,

	  };

	  setRegion(region) {
		this.setState({ region });
	  }

	  
	  componentDidMount() {
		this.getCurrentPosition();
	  }

	  getCurrentPosition() {
		try {
		  navigator.geolocation.getCurrentPosition(
			(position) => {
			  const region = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			  };
			  this.setRegion(region);
			},
	
		  );
		} catch(e) {
		  alert(e.message || "");
		}
	  }
	
	navigation = 0;
	constructor() {
		super()
		//navigation = props;
		this.state = {
			AnswerText:'',
			routeData:[],
			stopsData:[],
			jsondata:0,
			TextInputValueSource: '',
			TextInputValueDestination: '',
			
		}
	}

	GetValueFunction = () =>{
		let routes=[];
		let stops=[];
		let stoplat=[];
		let stoplong=[];
		this.setState({AnswerText:null});
		const { TextInputValueSource,TextInputValueDestination }  = this.state ;
		//Alert.alert(TextInputValueSource+" "+TextInputValueDestination);
		fetch('http://192.168.43.81:5000/routes?src='+TextInputValueSource+'&dest='+TextInputValueDestination)
		.then((response) => response.json())
    			.then((responseJson) => {
      				responseJson.map((ele)=>routes.push(ele.route));
					responseJson.map((ele)=>stops.push(ele.stops));
					responseJson.map((ele)=>stoplat.push(ele.latitude));
					responseJson.map((ele)=>stoplong.push(ele.longitude));
      				console.log("Length of array is:"+routes.length);
					this.setState({jsondata:responseJson})
      				this.setState({routeData:routes});
					this.setState({stopsData:stops});
	
    			})
    		.catch((error) => {
      			console.error(error);
    		});
		 }
		 

	render() {  
		let cnt=0;

		const { region } = this.state;
		const { children, renderMarker, markers } = this.props;

		let textEle1=this.state.stopsData.map((s)=>{
			
		}
		);
		
		let textEles=this.state.routeData.map((r)=> {   
			return(<TouchableHighlight key={r} onPress={()=>{
				stopd = this.state.stopsData[this.state.routeData.indexOf(r)]
				pdata = []
				sdata = []
				for(var i=0;i<stopd.length;i+=3) {
					pdata.push({lat:stopd[i+1],long:stopd[i+2]}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
				} 
				for(var i=0;i<stopd.length;i+=3) {
					sdata.push({stopname:stopd[i]}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
				} 
				this.props.navigation.navigate('RouteMap',{pdata:pdata},{sdata:sdata})		
			}}>

      				<Text style={{textAlign:"center",fontSize:20,padding:20,color:'rgb(0,0,255)',backgroundColor: 'rgb(50,150,120)',margin:5}}>{r+":"+ ++cnt}</Text>
      			</TouchableHighlight>)});
		
		
		return (
		<ScrollView contentContainerStyle={styles.contentContainer}>  


			
		    <MapView style={styles.map}
				showsUserLocation
				ref={ map => { this.map = map }}
				data={markers}
				initialRegion={region}
				renderMarker={renderMarker}
				onMapReady={this.onMapReady}
				showsMyLocationButton={true}
				textStyle={{ color: '#bc8b00' }}
				containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}>
			</MapView>

      		<View style={styles.container}>  
        		<TextInput  
          			style={styles.textInputStyle}  
          			onChangeText={(TextInputValueSource) => this.setState({TextInputValueSource})}  
          			placeholder="From"  
          			placeholderTextColor="red"  
        	/>  
        		<TextInput  
          			style={styles.textInputStyle}  
          			onChangeText={(TextInputValueDestination) => this.setState({TextInputValueDestination})}  
          			placeholder="To"  
          			placeholderTextColor="red"  
        		/>  
				 <Button style={styles.findRoute}
				 title="Find Routes" onPress={this.GetValueFunction} color="#2196F3" />
			</View>
					 
			<View style={styles.outputStyle}>
         		<Text>{this.state.AnswerText}</Text>
         		{textEles}
			</View>

  		</ScrollView>
      		
		);  

  	}  
}  
  
const styles = StyleSheet.create({  
	container: {  
    		//flex: 1,
    		padding:20  
	  },
	  findRoute: {
		  alignItems:'center',
		  justifyContent:'center',
		  top: '-20%',
	  },
	  contentContainer: {
		  
	  },
	  map: {
		backgroundColor:'#fff',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		},
  
	  outputStyle:{
		  bottom:'-30%',
		  //flex:0.5,
	  },
  	textInputStyle: {  
		  backgroundColor:'white',
		  	borderRadius:10,
    		borderColor: '#9a73ef',  
    		borderWidth: 1,  
    		height: 40,  
    		margin: 10,  
			padding: 10,
			flexDirection:'row',
			top:'-8%',
			justifyContent:'center',
			alignItems:'center',  
  	},  
  	textOutputStyle: {  
    		fontSize: 20  
  	}  
})  
  
