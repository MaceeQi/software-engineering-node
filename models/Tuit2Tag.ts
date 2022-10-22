/**
 * @file Declares Tuit2Tag data type representing relationship between
 * tuits and tags, as in a tuit has a tag
 */
import Tuit from "./Tuit";

/**
 * @typedef Tuit2Tag Represents relationship between a tuit and a tag,
 * as in a tuit has a tag
 * @property {string} tag Tag in the tuit
 * @property {Tuit} tuit Tuit that contains a tag
 */
export default class Tuit2Tag {
    private tag: string = '';
    private tuit: Tuit | null = null;
}