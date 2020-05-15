import axios from 'axios'
import {GETPINS} from '../defs/defs';
const YELP_API_KEY = 'Bh4igGfGISM_oTVYu3w1IaKt9vLIIIhS8q4xsuG2dDSsr7LPYCRSYSR09UvHqdgvB11m5yazi99rnE7cOLfopXtjkLueVl7zbchDetu8ZALPXtdzOaUFBvz2pyi9XnYx';

const api = axios.create({
    baseURL: 'https://api.yelp.com/v3',
    headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
    },
});

export const getLocations = userLocation => {
    return api
        .get('/businesses/search', {
            params: {
                limit: 15,
                categories: 'cars',
                ...userLocation,
            },
        })
        .then(res =>
            res.data.businesses.map(business => {
                return {
                    name: business.name,
                    coords: business.coordinates,
                }
            })
        )
        .catch(error => console.error(error))
};

export const getGroupLocations = async (id) => {
    const response =  await axios.get(GETPINS + `/${id}`);
    console.log(JSON.stringify(response),'string');
    const { data } = response;
    const { ok, message } = data;
    return data;
};
