//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyAp5ETaL1GTwc323oCXhKgCd19quXBEj4M",
      authDomain: "kwitter-de649.firebaseapp.com",
      databaseURL: "https://kwitter-de649-default-rtdb.firebaseio.com",
      projectId: "kwitter-de649",
      storageBucket: "kwitter-de649.appspot.com",
      messagingSenderId: "440422291600",
      appId: "1:440422291600:web:217ca740e5aedd98722015"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML = "Welcome " + userName + " !"

function Add_room() {
      room_name = document.getElementById("room_name").value
console.log(room_name)
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name)
      window.location = "kwitter_page.html"
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("roomName- "+ Room_names)
                  row = "<div class = 'room_name' id = "+Room_names+" onclick = 'RedirectToRoomName(this.id)'>#" + Room_names + "</div>" 
                  document.getElementById("output").innerHTML += row 

            });
      });
}
getData();

function RedirectToRoomName(name){
      console.log(name)
      localStorage.setItem("room_name", name)
      window.location = "kwitter_page.html"
}

function LogOut(){
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location = "index.html"
}