import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { fetchPlaces } from './api'

export default class App extends React.Component {
  state = {
    pins: [null],
  };

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return;
    }
    let location = await Location.getCurrentPositionAsync({})
    let name = (await Location.reverseGeocodeAsync(location.coords))[0]
    try {
      var closest = await fetchPlaces(location)
    } catch (err) {
      console.log(err.message)
    }

    this.setState({
      location,
      pins: [{
        key: 0,
        coords: { latitude: location.coords.latitude, longitude: location.coords.longitude },
        name: name.street,
        pinColor: 'red',
      },
      ...closest]
    })
  };

  componentDidMount() {
    this.getLocation();
  }

  renderPins = () => {
    return this.state.pins.map((item) => {
      return (
        <MapView.Marker key={item.key} coordinate={item.coords} title={item.name} pinColor={item.pinColor} />
      );
    });
  }

  render() {
    if (!this.state.pins[0]) {
      return (
        <View style={{ flex: 1, alignContent: 'center' }}>
          <Text> Loading </Text>
        </View>
      );
    }
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* <MapView.Marker coordinate={this.state.location.coords} title="You are here" description={this.state.here.street} /> */}
        {this.renderPins()}
      </MapView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
