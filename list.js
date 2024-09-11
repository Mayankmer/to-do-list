import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"


const firebaseApp = {
    apiKey: "AIzaSyAcpRftHqctHKYgWuV6oscN3EGnhiarPjA",
    authDomain: "realtime-database-1809b.firebaseapp.com",
    databaseURL: "https://realtime-database-1809b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realtime-database-1809b",
    storageBucket: "realtime-database-1809b.appspot.com",
    messagingSenderId: "228703995594",
    appId: "1:228703995594:web:45c26086b99c65e44fd633"
}

const app = initializeApp(firebaseApp)
const database = getDatabase(app)
const auth = getAuth(app)
let userID = null

const inputField = document.getElementById("input-field")
const addButton  = document.getElementById("add-button")
const items = document.getElementById("item-list")

let itemListInDB = null

onAuthStateChanged(auth, (user) => {
    if (user) {
        userID = user.uid // Get the user's UID
        itemListInDB = ref(database, `users/${userID}/itemList`) // Store shopping list under user-specific path

        //adding an item:
        addButton.addEventListener("click", addItem)

        inputField.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                addItem()
            }
        })

        // Fetch and display the user's shopping list
        onValue(itemListInDB, function(snapshot) {
            if (snapshot.exists()) {
                let itemsArray = Object.entries(snapshot.val())
            
                clearitemListEl()
                
                for (let i = 0; i < itemsArray.length; i++) {
                    let currentItem = itemsArray[i]
                    let currentItemID = currentItem[0]
                    let currentItemValue = currentItem[1]
                    
                    appendItem(currentItem)
                }    
            } else {
                items.innerHTML = "No items here... yet"
            }
        })
    } else {
        // Redirect to login page if no user is logged in
        window.location.href = "auth.html"
    }
})

function addItem() {
    let inputValue = inputField.value
    if (inputValue) {
        push(itemListInDB, inputValue)
        clearInputField()
    }
}

function clearitemListEl() {
    items.innerHTML = ""
}
function clearInputField(){
    inputField.value = null
}


function appendItem(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let locationOfItem = ref(database, `users/${userID}/itemList/${itemID}`)
        
        remove(locationOfItem)
    })
    
    items.append(newEl)
}