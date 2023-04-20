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

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function send() {
    msg = document.getElementById("msg").value
    console.log(msg)
    console.log(user_name)
    console.log(room_name)

    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    })
    document.getElementById("msg").value = ""
}

function LogOut() {
    localStorage.removeItem("user_name")
    localStorage.removeItem("room_name")
    window.location.replace("index.html")
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key
            childData = childSnapshot.val()
            if (childKey != "purpose") {
                firebase_message_id = childKey
                message_data = childData
                console.log(firebase_message_id)
                console.log(message_data)
                name_1 = message_data['name']
                message = message_data['message']
                like = message_data['like']

                name_with_tag = "<h4>" + name_1 + "<img class= 'user_tick' src= 'tick.png'>" + "</h4>"
                message_with_tag = "<h4 class= 'message_h4'>" + message + "</h4>"
                like_button = "<button class = 'btn btn-warning' id= " + firebase_message_id + " value = " + like + " onclick = 'update_like(this.id)'>"
                span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> like:" + like + "</span>" + "</button>" + "<hr>"
                row = name_with_tag + message_with_tag + like_button + span_with_tag
                document.getElementById("output").innerHTML += row

            }
        })
    })
}
getData()

function update_like(message_id) {
    button_id = message_id
    likes = document.getElementById(button_id).value
    updated_likes = Number(likes) + 1
    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });


}