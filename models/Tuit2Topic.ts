/**
 * @file Declares Tuit2Topic data type representing relationship between
 * tuits and topics, as in a tuit has a topic
 */
import Tuit from "./Tuit";

/**
 * @typedef Tuit2Topic Represents relationship between a tuit and a topic,
 * as in a tuit has a topic
 * @property {string} topic Topic of the tuit
 * @property {Tuit} tuit Tuit that is has a topic
 */
export default class Tuit2Topic {
    private topic: string = '';
    private tuit: Tuit | null = null;
}