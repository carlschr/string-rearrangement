# String Array Rearrangement
Function that determines if an array of strings of equal length can be rearranged so that each string's neighbors only differ by exactly one character.

This repo contains two files: stringsRearrangement.js and stringsRearrangment2.js

The first contains a solution using a recursive function with a time complexity of O(N!).
The second contains a solution using a loop through all subarrays of the initial array, and some additional insights. The time complexity of this olution is O(N^2 * 2^N).
