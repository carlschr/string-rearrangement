function stringsRearrangement(a){
    let connections = buildConnections(a)
    // If any elements are cut off from the rest completely, a path is not possible
    if (connections.some(connection => connection.length == 0)) return false
    
    // Attempts to build a path with each element as a starting point
    for (let i = 0; i < a.length; i++){
        if (buildPath(i, [i], connections)) return true
    }
    return false
}

// Helper function to check if two strings of the same length differ by exactly one character
function differsByOne(el, el2){
    return Array.from(el).filter((c, i) => c === el2[i]).length === el.length - 1
}

// Function to return an array of connections 
// return would be [[1, 2], [0, 2], [0, 1]] for ['abc', 'abe', 'abz']
function buildConnections(a){
    let connections = []
    for (let i = 0; i < a.length; i++){
        let connection = []
        for (let j = 0; j < a.length; j++){
            if (differsByOne(a[i], a[j])) {
                connection.push(j)
            }
        }
        connections.push(connection)
    }
    return connections
}

// Function that recursively checks if a path can see all elements of the array for a given starting point
function buildPath(current, path, c){
    // Success condition
    if (path.length === c.length) return true
    
    let connection = c[current]
    // Attempts to continue the path with each unused connection
    for (let i = 0; i < connection.length; i++){
        if (path.includes(connection[i])) continue
        if (buildPath(connection[i], [...path, connection[i]], c)) return true
    }
    return false
}