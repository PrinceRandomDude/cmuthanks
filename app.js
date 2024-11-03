// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const form = document.getElementById('fruit-form');
const fruitInput = document.getElementById('fruit-input');
const fruitList = document.getElementById('fruit-list');

// Submit form event listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fruit = fruitInput.value.trim().toLowerCase();

    if (fruit) {
        // Add or update the fruit count in the database
        const fruitRef = database.ref('fruits/' + fruit);
        fruitRef.transaction((currentCount) => (currentCount || 0) + 1)
            .then(() => {
                fruitInput.value = ''; // Clear the input field
                displayFruitCounts(); // Refresh the display
            })
            .catch((error) => console.error('Error updating count:', error));
    }
});

// Display fruit counts
function displayFruitCounts() {
    database.ref('fruits').once('value', (snapshot) => {
        fruitList.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const fruitName = childSnapshot.key;
            const count = childSnapshot.val();
            const fruitItem = document.createElement('div');
            fruitItem.textContent = `${fruitName}: ${count}`;
            fruitList.appendChild(fruitItem);
        });
    });
}

// Initial call to display current fruit counts
displayFruitCounts();
