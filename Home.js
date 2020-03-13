import React, { Component } from "react";  
import MapView from 'react-native-maps'
import {Dimensions} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
// import Constants from 'expo-constants';
import {TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback, StyleSheet, View, TextInput, Text, Alert ,Button, ScrollView} from "react-native";  
// import { SafeAreaView } from "react-native-safe-area-context";

const stopnames = require("../stopname.json");

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
		stopnames:[]
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
		this.state = {
			query:'',
			query2:'',
		//	selected: '',
			stopnames:stopnames.name,
			AnswerText:'',
			routeData:[],
			stopsData:[],
			jsondata:0,
			TextInputValueSource: '',
			TextInputValueDestination: '',
			
		}
	}

	findLoc = (query) => {
		if(query==='' ) return [];
		const regex = new RegExp(`${query.trim()}`, 'i');
		//onsole.log("..",stopnames.name);
		const {stopnames} = this.state;
		//return the filtered film array according the query from the input
		return stopnames.filter(stopname => stopname.search(regex) >= 0);
	}

	GetValueFunction = () =>{
		let routes=[];
		let stops=[];
		let stoplat=[];
		let stoplong=[];
		this.setState({AnswerText:null});
		const {query, query2} = this.state;
		fetch('http://192.168.43.81:5000/routes?src='+query+'&dest='+query2)
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
		const {query} = this.state;
		const {query2} = this.state;
		const stopnames = this.findLoc(query);
		stopnames2 = this.findLoc(query2);
		const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
		return (
			<View>
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



				<View style={styles.mystyle}>  
					<Autocomplete
					containerStyle={styles.autocompleteContainer}
					data={ stopnames.length == 1 && comp(query, stopnames[0])?[]:stopnames}
					defaultValue={query}
					onChangeText={text => {this.setState({ query: text });}}
					placeholder="From"
					renderItem={( {item, i} ) => (
					<TouchableOpacity onPress={() => this.setState({ query: item })}>
					<Text style={styles.itemText}>
						{item} 
					</Text>
					</TouchableOpacity>
					)}
					/>
				</View>
				<View style={styles.textInputstyle}>
					<Autocomplete
					containerStyle={styles.autocompleteContainer2}
					data={ (stopnames2.length == 1 && comp(query2, stopnames2[0]))?[]:stopnames2}
					defaultValue={query2}
					onChangeText={text => {this.setState({ query2: text }); console.log("hey:)", text)}}
					placeholder="To"
					//valueExtractor={item => item}
					renderItem={( {item, i} ) => (

						<TouchableOpacity onPress={() => this.setState({ query2: item })}>
						<Text style={styles.itemText}>
							{item} 
						</Text>
						</TouchableOpacity>
					)}
					/>

				</View>
				<View style={styles.findRoute}>
					<Button 
						title="Find Routes" onPress={this.GetValueFunction} color="red"/>
					</View>
				{/* <View style={styles.outputStyle}> */}
				{/* <SafeAreaView style={styles.containerView}> */}
				<View style={styles.textoutputStyle}>
					<ScrollView style={styles.textoutputStyle}>
						<Text style={styles.outputText}>{this.state.AnswerText}</Text>
						{textEles}
					</ScrollView> 
				</View>
				{/* </SafeAreaView> */}
				{/* </View> */}

			</View>
		);
  	}  
}

const styles = StyleSheet.create({  
	container: {  
    		//flex: 1,
			padding:20,
			//width:'100%',
			//height:'10%',
	  },
	  itemText: {
		fontSize: 15,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 2,
	  },
	  autocompleteContainer: {
		flex: 1,
		borderRadius:10,
		margin:'1%',
		left: 0,
		 position: 'absolute',
		right: 0,
		top: -5,
		 zIndex: 1
	  },
	  autocompleteContainer2: {
		flex: 1,
		borderColor: '#9a73ef',  
		borderWidth: 1, 
		borderRadius:10,
		 left: 0,
		 position: 'absolute',
		 right: 0,
		top: 40,
		// zIndex: 1
	  },
	  mainStyle:{
		  alignItems:'center',
	  },
	  findRoute: {
		flex: 1,
		left: 0,
		color:'red',
	   position: 'absolute',
		right: 0,
	   top: 85,
	  },
	  contentContainer: {
		  
	  },
	  map: {
		backgroundColor:'#fff',
		position: 'absolute',
		height:'4000%',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
		flex:1,
		},
  
	  outputStyle:{
		  bottom:'-30%',
		  //flex:1,
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
		backgroundColor:'red',
		marginHorizontal:100,
		bottom:'-50%',
		top:'-50%', 
		flex:1,
 
	  },
	  outputStyle: { 
		backgroundColor:'red',
		marginHorizontal:20, 
 
	  },
	containerView: {
		flex:1,
		marginTop:Constants.statusBarHeight,
	}
})  
  
