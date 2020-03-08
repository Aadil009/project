import React, { Component } from "react";  
import {TouchableHighlight,TouchableWithoutFeedback, StyleSheet, View, TextInput, Text, Alert ,Button, ScrollView} from "react-native";  
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
			
		}
	}

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
		let textEle1=this.state.stopsData.map((s)=>{
			
		}
		);
		
		let textEles=this.state.routeData.map((r)=> {   
			return(<TouchableHighlight key={r} onPress={()=>{
				stopd = this.state.stopsData[this.state.routeData.indexOf(r)]
				pdata = []
				for(var i=0;i<stopd.length;i+=3) {
					pdata.push({lat:stopd[i+1],long:stopd[i+2]})
				} 
				this.props.navigation.navigate('RouteMap',{pdata:pdata})		
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
  
