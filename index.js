// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALHWQYgLuetj5FetuKegG00lZbq-6mlrU",
  authDomain: "web-data-9cce2.firebaseapp.com",
  databaseURL: "https://web-data-9cce2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-data-9cce2",
  storageBucket: "web-data-9cce2.firebasestorage.app",
  messagingSenderId: "50223594159",
  appId: "1:50223594159:web:112cb230d5bde04c6ab25a",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to the button and the element to display the click count
const clickButton = document.getElementById('clickButton');
const clickCountDisplay = document.getElementById('clickCountDisplay');

// Reference to the Firebase database location where we'll store the click count
const clickCountRef = database.ref('clickCount');

// Function to update the UI with the current click count
function updateClickCount(count) {
    clickCountDisplay.textContent = `Click count: ${count}`;
}

// Function to fetch the current click count from Firebase and update the UI
function getClickCount() {
    clickCountRef.once('value', (snapshot) => {
        const count = snapshot.val() || 0;
        updateClickCount(count);
    });
}

// Function to increment the click count in Firebase and update the UI
function incrementClickCount() {
    clickCountRef.transaction((currentCount) => {
        return (currentCount || 0) + 1;
    }, (error, committed, snapshot) => {
        if (error) {
            console.log(error);
        } else if (committed) {
            const newCount = snapshot.val();
            updateClickCount(newCount);
        }
    });
}

// Add a click event listener to the button
clickButton.addEventListener('click', incrementClickCount);

// Initial call to get the click count when the page loads
getClickCount();
