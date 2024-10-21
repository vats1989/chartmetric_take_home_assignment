function processStrings(arr) {
    return arr
        .map(str => str.trim())                                // Remove leading/trailing spaces
        .map(str => str.replace(/\s+/g, ' '))                  // Replace multiple spaces with a single space
        .map(str => str.split(' ')                             // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Title case each word
        .join(' '))                            // Join the words back together
        .sort();                                               // Sort the array in ascending order
}

console.log(processStrings(['  nice', 'hey there     ', '   woah       man ']));  
// Output: [ 'Hey There', 'Nice', 'Woah Man' ]

console.log(processStrings(['hi']));  
// Output: [ 'Hi' ]

console.log(processStrings([]));  
// Output: []

console.log(processStrings(['hey', '    hey', 'hey   ']));
// Output: [ 'Hey', 'Hey', 'Hey' ]
