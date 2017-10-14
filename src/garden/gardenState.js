/**
 * GardenState represents the player's garden. Each GardenSquare can hold one plant, and is
 * represented by a spot in the state array. A null spot means that that spot in the array is
 * empty. The structure of a plant in a GardenSquare spot is as follows:
 *
 *  {
 *    ...strain,            // Strain properties
 *    age: Number,          // Plant age in milliseconds
 *    ageUpdated: Date,     // Last time the age was updated
 *    phase: String,        // Name of plant phase
 *    phaseIndex: Number,   // Index of plant phase
 *    gardenSquare: Number  // Index of plant location in garden state array
 *  }
 *
 * @type {null[]}
 */

const GardenState = [null];

export default GardenState;
