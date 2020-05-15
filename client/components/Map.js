import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
//import * as Permissions from "expo-permissions";
import { POSTPIN, TIMEOUT } from "../defs/defs";
import axios from "axios";
import { loadData } from "../helpers/localstorage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  mapWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
  crosshairsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  trackButton: {
    position: "absolute",
    right: 230,
    bottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomButtonIn: {
    position: "absolute",
    right: 10,
    bottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomButtonOut: {
    position: "absolute",
    right: 120,
    bottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomButtonText: {
    fontSize: 25,
  },
});

class Map extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
        accuracy: 0,
      },
      startedTracking: false,
      user: null,
    };
  }

  async startPostPins() {
    try {
      const userStored = await loadData("logged_user");
      const user = JSON.parse(userStored);

      const body = {
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude,
        user_id: Number(user.user_id),
        group_id: Number(user.group_id),
      };

      const { data } = await axios.post(POSTPIN, body);
      const { ok, message} = data;
      console.log(`action is ${ok}`, message);
    } catch (e) {
      console.log('startPostPins', JSON.stringify(e));
    }
  }

  onPressZoomIn() {
    const region = {
      ...this.state.region,
      latitudeDelta: this.state.region.latitudeDelta / 5,
      longitudeDelta: this.state.region.longitudeDelta / 5,
    };
    this.setState({ region }, this.map.animateToRegion(region, 100));
  }

  onPressZoomOut() {
    const region = {
      ...this.state.region,
      latitudeDelta: this.state.region.latitudeDelta * 5,
      longitudeDelta: this.state.region.longitudeDelta * 5,
    };
    this.setState({ region }, this.map.animateToRegion(region, 100));
  }

  calDelta(lat, long, accuracy) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta =
      accuracy /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    this.setState({
      region: {
        latitude: lat,
        longitude: long,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
        accuracy: accuracy,
      },
    });
  }

  swithTrackingInterval() {
    this.setState({ startedTracking: !this.state.startedTracking });
  }

  UNSAFE_componentWillMount() {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        this.calDelta(lat, long, accuracy);
        if (this.state.startedTracking) {
          this.startPostPins();
        }
      },

      (error) => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: TIMEOUT, maximumAge: 1000 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  marker() {
    return {
      latitude: Number(this.state.region.latitude),
      longitude: Number(this.state.region.longitude),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.region ? (
          <MapView
            ref={(ref) => (this.map = ref)}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={this.state.region}
          >
            <Marker
              coordinate={this.marker()}
              title="You"
              description="You are here!"
              pinColor="green"
            />
          </MapView>
        ) : (
          <Text>cordinates not found</Text>
        )}

          {this.state.startedTracking ? (<TouchableOpacity
            style={styles.trackButton}
            onPress={() => {
              this.swithTrackingInterval();
            }}
          >
             <Text> Stop Tracking</Text>
          </TouchableOpacity>) : (<TouchableOpacity
              style={styles.trackButton}
              onPress={() => {
              this.swithTrackingInterval();
          }}
              >
              <Text> Start Tracking</Text>
              </TouchableOpacity>)}

        <TouchableOpacity
          style={styles.zoomButtonOut}
          onPress={() => {
            this.onPressZoomOut();
          }}
        >
          <Text>Zoom Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.zoomButtonIn}
          onPress={() => {
            this.onPressZoomIn();
          }}
        >
          <Text>Zoom In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Map;
