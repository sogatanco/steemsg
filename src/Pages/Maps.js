import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {Container} from 'react-bootstrap';
import '../App.css';
import MapStyle  from './MapStyle';

 
class Maps extends React.Component{
     render(){

         return(
             <div className="tes">
                  <Map className="map"
                  options={{styles:MapStyle.plos}}
                google={this.props.google}
                zoom={3}
                
                initialCenter={{ lat: 4.635481, lng: 96.896346 }}>
                    <Marker position={{ lat: 5.145732, lng: 97.144462 }}  label="@ponpase"/>
                    <Marker position={{ lat: 5.117384, lng:97.210470}}  label="@arie.steem"/>
                    <Marker position={{ lat: 5.117384, lng:97.210470}}  label="@pojan"/>
                    <Marker position={{ lat: 8.154480, lng:-1.128527}}  label="@mcsamm"/>
                    <Marker position={{ lat: 29.414012, lng:69.089543}}  label="@cryptokraze"/>
                    <Marker position={{ lat: 3.139874, lng:101.668448}}  label="@talktofaith"/>
                    <Marker position={{ lat: 15.199774, lng:107.984233}}  label="@oscarcc99"/>
                </Map>
             </div>
      
         )
     }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyBtRbepysOoinNjOQX2hmCSuww-2e7s71M'
  })(Maps);