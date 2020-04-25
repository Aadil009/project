import React,{ Component} from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,TouchableHighlight} from 'react-native';

export default class HelloWorld extends React.Component {
    constructor() {
		super()
		this.state = {
            routeData:[]
        }
    }
    
    render(){
        const params = this.props.route.params;
        this.state.routeData = params.routeData;
        this.state.jsondata = params.jsondata;
        this.state.stopsData = params.stopsData;
        let textEles=this.state.routeData.map((r)=> {   
        return(<TouchableHighlight style={styles.touchableStyle} underlayColor='' key={r} 
            onPress={()=>{ 
				let stopd = this.state.stopsData[this.state.routeData.indexOf(r)]
				let pdata = []
				let sdata = []
				let sadata=this.state.jsondata[this.state.routeData.indexOf(r)]
				for(var i=0;i<stopd.length;i++) {
					pdata.push({lat:stopd[i].latitude,long:stopd[i].longitude}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
				} 
				for(var i=0;i<stopd.length;i++) {
					sdata.push({stopname:stopd[i].stop}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
				} 
				this.props.navigation.navigate('RouteMap',{pdata:{pdata:pdata,sdata:sdata,satime:sadata["source arrival time"],datime:sadata["destination arrival time"]}})		
			}}>
				  
				  <Text style={{textAlign:"center",zIndex:1,fontSize:15,padding:20,color:'black',backgroundColor: 'purple',margin:1}}>{r+":"}</Text>
				  </TouchableHighlight>
        )
        }
        );

        return(

            <View style={styles.textoutputStyle}>
            <ScrollView >
                <Text style={styles.outputText}>{this.state.AnswerText}</Text>
                {textEles}
            </ScrollView> 
        </View>
        )
    }
}
const styles = StyleSheet.create({  
	container: {  
    		flex: 1,
			backgroundColor: 'red'
			//width:'100%',
			//height:'10%',
    },
    touchableStyle:{
        justifyContent:"center",
        padding:15,
        
        //alignItems:'center'
    },
    textstyle:{
        fontSize:20
    },
      
    outputText: {
        flex:1,
        backgroundColor: 'white',
    },
    textOutputStyle: { 
    backgroundColor:'red',
    marginHorizontal:100,
    padding: 15,
    //bottom:'-50%',
    position:'absolute',
    //   top: '50%',
    //zIndex:1, 
    flex:1,
    },
});