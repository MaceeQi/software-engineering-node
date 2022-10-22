/**
 * @file Declares Location data type representing a location with latitude and longitude
 */

/**
 * @typedef Location Represents a location with a latitude and longitude
 * @param {number} latitude Latitude of the location
 * @param {number} longitude Longitude of the location
 */
export default class Location {
    public latitude: number = 0.0;
    public longitude: number = 0.0;
};