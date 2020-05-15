import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Button } from 'react-native-elements';
import get from 'lodash/get';
import pick from 'lodash/pick';
import MapView from "react-native-maps";
import {getLocations, getGroupLocations} from '../helpers/Service';
import {loadData} from '../helpers/localstorage';

const initialRegion={
    latitude: 37.321996988,
    longitude: -122.0325472123455
};
const deltas={
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

const styles =  {
    container: {
        width: '100%',
        height: '100%'
    },
    filters: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    button: {
        marginVertical: 4
    }
};

class GropTrackMap extends Component {

    state = {
        location: null,
        errorMessage: null,
        locations: []
    };

    async componentWillMount() {
        const loadedUser = await loadData('logged_user');
        const user = JSON.parse(loadedUser);
        const gigel = await getGroupLocations(user.group_id);
        console.log('gigel',gigel);
        this.getLocationAsync();
    }

    getLocations = async filter => {
        const coords = get(this.state.location, 'coords');
        const userLocation = pick(coords, ['latitude', 'longitude']);

        let locations = await getLocations(
            userLocation,
            filter
        );
        this.setState({ locations });
    };

    renderMarkers() {
        return this.state.locations.map((place, i) => (
            <MapView.Marker key={i} title={place.name} coordinate={place.coords} />
        ));
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        await this.setState({ location });

        this.getLocations();
    };

    render() {
        const { location } = this.state;

        const region = {
            latitude: get(location, 'coords.latitude', null),
            longitude: get(location, 'coords.longitude', null),
            ...deltas
        };

        if (!region.latitude || !region.longitude) {
            return (
                <View>
                    <Text>Loading map...</Text>
                </View>
            );
        }
        return (
            <View style={{ flex: 7 }}>
                <MapView
                    style={styles.container}
                    region={region}
                    initialRegion={{ ...initialRegion, ...deltas }}
                    showsUserLocation
                    showsMyLocationButton
                >
                    {this.renderMarkers()}
                </MapView>
            </View>
        );
    }
}

export const GroupTrack = ({ navigation }) => {
    return (
        <React.Fragment>
            <GropTrackMap navigation={navigation} />
        </React.Fragment>
    );
};