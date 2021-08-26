function stringsRearrangement(a) {
    //Made using the idea of a Hamiltonian path: a path that visits all elements in a set exactly once

    //A path built using a set and starting with a vertex (v) is Hamiltonian 
    // if the subset without v can make a Hamiltonian path that starts with a connection to v

    //Helper function to determine if two elements differ by exactly one character
    let check = (n, m) => {
        if (n === m) return false;
        let diff = 0;
        for(let j = 0; j < n.length; j++){
            if (n[j] !== m[j]) diff++;
            if (diff > 1) return false;
        };
        return true;
    };
    
    // Builds a matrix of connections where both row numbers and column numbers represent the array elements
    let connections = Array(a.length).fill(0).map(_ => Array(a.length).fill(0));
    for (let i = 0; i < a.length; i++){
        for (let j = 0; j < a.length; j++){
            if (check(a[i], a[j])) {
                connections[i][j] = 1;
            };
        };
    };
    
    // Creates an empty matrix where the rows are the array elements and the columns are the possible subarrays
    let table = Array(a.length).fill(0).map(_ => Array(1 << a.length).fill(0));
    // Subarrays containing only one element are Hamiltonian
    // Since the subarrays are represented in binary, those containing one element are powers of 2
    for (let i = 0; i < a.length; i++){
        table[i][1 << i] = 1;
    };
    
    // For all subsets
    for (let s = 0; s < 1 << a.length; s++){
        // For each element of the array
        for (let n = 0; n < a.length; n++){
            // If the element is in the subset
            if (s & 1 << n){
                // Compare the element to all other elements
                for (let m = 0; m < a.length; m++){
                    // If the two elements are connected and the current subset w/o element one and starting with element two is Hamiltonian
                    if (connections[n][m] && table[m][s ^ (1 << n)]){
                        // The current subset starting with element one is Hamiltonian
                        table[n][s] = 1;
                        break;
                    };
                };
            };
        };
    };
    
    // If the subset containing all elements is Hamiltonian return true
    for (let i = 0; i < a.length; i++){
        if (table[i][(1 << a.length) - 1]) {
            return true;
        };
    };
    return false;
}