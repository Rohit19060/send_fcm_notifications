let isRoute = document.querySelector("#isRoute");
let isSound = document.querySelector("#isSound");
let extraParams = document.querySelector("#extraParams");
let routes = [];

isRoute.addEventListener("change", function () {
    let routeDiv = document.querySelector("#route");
    if (isRoute.checked && routeDiv == null) {
        let routeDiv = document.createElement("div");
        routeDiv.id = "route";

        routeDiv.classList.add("inputDiv");
        routeDiv.innerHTML = `
                <label for="route">Route</label>
                <input type="text" id="inputRoute" name="inputRoute" placeholder="Route" required /> <svg xmlns="http://www.w3.org/2000/svg"
                        class="addIcon" viewBox="0 0 20 20" fill="#0f0" onclick="addRoute()">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clip-rule="evenodd" />
                    </svg> 
                `;
        extraParams.appendChild(routeDiv);
    } else {
        extraParams.removeChild(routeDiv);
    }
});

isSound.addEventListener("change", function () {
    let soundDiv = document.querySelector("#sound");
    if (isSound.checked && soundDiv == null) {
        let soundDiv = document.createElement("div");
        soundDiv.id = "sound";
        soundDiv.classList.add("inputDiv");
        soundDiv.innerHTML = `<label for="sound"> Sound </label> <input type="text" id="inputSound"
                    name="inputSound" placeholder="Sound" required />
                `;
        extraParams.appendChild(soundDiv);
    } else {
        extraParams.removeChild(soundDiv);
    }
});

window.onload = () => {
    const token = localStorage.getItem("token");
    if (token) {
        document.getElementById("token").value = token;
    }
    const FCMKey = localStorage.getItem("FCMKey");
    if (FCMKey) {
        document.getElementById("FCMKey").value = FCMKey;
    }
};

// Send push notification
function sendNotification(e) {
    let token = document.getElementById("token");
    let FCMKey = document.getElementById("FCMKey");

    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;

    let tokenValue = token.value;
    let fcmKeyValue = FCMKey.value;

    if (!tokenValue) {
        alert("Please enter token");
        token.focus();
        return false;
    } else if (!fcmKeyValue) {
        alert("Please enter FCM Key");
        FCMKey.focus();
        return false;
    }

    let data = {
        to: tokenValue,
        notification: {
            title: title,
            body: body,
        },
        data: {
            click_action: "FLUTTER_NOTIFICATION_CLICK",
        },
        priority: 10,
        android: {
            priority: "high",
        },
        apns: {
            headers: {
                "apns-priority": "5",
            },
        },
        webpush: {
            headers: {
                Urgency: "high",
            },
        },
    };

    if (isRoute.checked) {
        let route = document.querySelector("#inputRoute").value;
        data.data.route = route;
    }

    if (isSound.checked) {
        let sound = document.querySelector("#inputSound").value;
        data.notification.sound = sound;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://fcm.googleapis.com/fcm/send");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "key=" + fcmKeyValue);
    xhr.send(JSON.stringify(data));
    document.getElementById("payload").innerHTML =
        '<div class="center">' + JSON.stringify(data) + "</div>";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(JSON.parse(xhr.responseText));
            if (
                xhr.status == 200 &&
                JSON.parse(xhr.responseText)["success"] == 1
            ) {
                alert("Notification sent successfully");
                localStorage.setItem("token", tokenValue);
                localStorage.setItem("FCMKey", fcmKeyValue);
            } else {
                if (
                    JSON.parse(xhr.responseText)["results"][0]["error"] ==
                    "NotRegistered"
                ) {
                    alert("Token is not registered");
                } else {
                    alert("Notification not sent");
                }
            }
            setTimeout(() => {
                document.getElementById("response").innerHTML = "";
            }, 3000);
        }
    };
    return false;
}