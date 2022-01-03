let isRoute = document.querySelector("#isRoute");
let isSound = document.querySelector("#isSound");
let routeDiv = document.querySelector("#route");
let inputTokens = document.querySelector("#inputTokens");
let routes = [];
let deviceTokens = [];

isRouteFunction = () => {
    if (isRoute.checked) {
        routeDiv.innerHTML = `<div class="d-flex align-items-center my-2">
                    <input type="text" class="form-control p-2 my-0 " placeholder="Route" id="routeInput">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ms-1 custom-hover" viewBox="0 0 20 20" fill="#0f0"
                        onclick="addRoute()" width="30" height="30">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clip-rule="evenodd" />
                    </svg>
                </div>`;
        addRoutesToSelect();
        localStorage.setItem("isRoute", true);
    } else {
        routeDiv.innerHTML = "";
        localStorage.setItem("isRoute", false);
    }
}

isRoute.addEventListener("change", isRouteFunction);

addRoutesToSelect = () => {
    if (routes.length > 0) {
        routes.reverse();
        let routeSelect = document.querySelector("#routeSelect");
        if (routeSelect == null) {
            let selectDiv = document.createElement("div");
            selectDiv.className = "d-flex align-items-center my-2";
            selectDiv.id = "selectDiv";
            let select = document.createElement("select");
            select.id = "routeSelect";
            select.className = "form-select my-2";
            routes.forEach((route) => {
                let option = document.createElement("option");
                option.value = route;
                option.text = route;
                select.appendChild(option);
            });
            selectDiv.appendChild(select);
            let svg = `<svg xmlns="http://www.w3.org/2000/svg" class="ms-1 mt-2 custom-hover" width="30" height="30" viewBox="0 0 20 20" fill="#f00" onclick="removeRoute()" >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                    </svg>`;
            selectDiv.innerHTML += svg;
            document.querySelector("#route").appendChild(selectDiv);
        } else {
            routeSelect.innerHTML = "";
            routes.forEach((route) => {
                let option = document.createElement("option");
                option.value = route;
                option.text = route;
                routeSelect.appendChild(option);
            });
        }
    }
}

addRoute = () => {
    let route = routeDiv.querySelector("input").value;
    if (route != "") {
        routes.push(route);
        localStorage.setItem("routes", routes);
    } else {
        routeDiv.querySelector("input").focus();
    }
    routeDiv.querySelector("input").value = "";
    addRoutesToSelect();
};

removeRoute = () => {
    let routeSelect = document.querySelector("#routeSelect");
    let route = routeSelect.value;
    if (routes.length > 0) {
        routes.splice(routes.indexOf(route), 1);
        localStorage.setItem("routes", routes);
        routeSelect.value = "";
        addRoutesToSelect();
    }
    if (routes.length == 0) {
        localStorage.removeItem("routes");
        let selectDiv = document.querySelector("#selectDiv");
        selectDiv.parentNode.removeChild(selectDiv);
    }
}

addTokens = () => {
    let token = document.querySelector("#token").value;
    if (token != "") {
        deviceTokens.push(token);
        localStorage.setItem("deviceTokens", deviceTokens);
    } else {
        document.querySelector("#token").focus();
    }
    document.querySelector("#token").value = "";
    addTokensToSelect();
}

removeToken = () => {
    if (deviceTokens.length > 0) {
        let tokenSelect = document.querySelector("#tokensSelect");
        if (tokenSelect != null && deviceTokens.length > 0) {
            tokenValue = tokenSelect.value;
            deviceTokens.splice(deviceTokens.indexOf(tokenValue), 1);
        }
        localStorage.setItem("deviceTokens", deviceTokens);
        addTokensToSelect();
    }
    if (deviceTokens.length == 0) {
        localStorage.removeItem("deviceTokens");
        let tokensDiv = document.querySelector("#tokensDiv");
        tokensDiv.parentNode.removeChild(tokensDiv);
    }
}

addTokensToSelect = () => {
    if (deviceTokens.length > 0) {
        deviceTokens.reverse();
        let selectToken = document.querySelector("#tokensSelect");
        if (selectToken == null) {
            let tokensDiv = document.createElement("div");
            tokensDiv.className = "d-flex align-items-center mb-3";
            tokensDiv.id = "tokensDiv";
            let selectToken = document.createElement("select");
            selectToken.id = "tokensSelect";
            selectToken.className = "form-select";
            deviceTokens.forEach((token) => {
                let option = document.createElement("option");
                option.value = token;
                option.text = token;
                selectToken.appendChild(option);
            });
            tokensDiv.appendChild(selectToken);
            let svg = `<svg xmlns="http://www.w3.org/2000/svg" class="ms-2 custom-hover" width="30" height="30" viewBox="0 0 20 20" fill="#f00" onclick="removeToken()" >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                    </svg>`;
            tokensDiv.innerHTML += svg;
            inputTokens.appendChild(tokensDiv);
        } else {
            selectToken.innerHTML = "";
            deviceTokens.forEach((token) => {
                let option = document.createElement("option");
                option.value = token;
                option.text = token;
                selectToken.appendChild(option);
            });
        }
    }
}

updatePreview = (e) => {
    if (e.id == "title") {
        if (e.value.length > 0) {
            document.querySelector("#titlePreview").innerHTML = e.value;
        } else {
            document.querySelector("#titlePreview").innerHTML = "Notification Title";
        }
    } else {
        if (e.value.length > 0) {
            document.querySelector("#bodyPreview").innerHTML = e.value;
        } else {
            document.querySelector("#bodyPreview").innerHTML = "Notification Body";
        }
    }
}



isSound.addEventListener("change", function () {
    let soundDiv = document.querySelector("#sound");
    if (isSound.checked) {
        soundDiv.innerHTML = `<div class="d-flex align-items-center mt-2">
            <input type="text" id="inputSound" name="inputSound" class="form-control p-2 my-0 " placeholder="Sound">
            </div>`;
    } else {
        sound.innerHTML = "";
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
    const isRoute = localStorage.getItem("isRoute");
    if (isRoute == "true") {
        document.querySelector("#isRoute").checked = true;
        isRouteFunction();
        const routesStore = localStorage.getItem("routes");
        if (routesStore) {
            routes = routesStore.split(",");
            addRoutesToSelect();
        }
    }
    const deviceTokensStorage = localStorage.getItem("deviceTokens");
    if (deviceTokensStorage) {
        deviceTokens = deviceTokensStorage.split(",");
        addTokensToSelect();
    }
};

// Send push notification
function sendNotification(e) {
    let token = document.querySelector("#token");
    let FCMKey = document.querySelector("#FCMKey");

    let title = document.querySelector("#title").value;
    let body = document.querySelector("#body").value;

    let tokenValue = token.value;
    let fcmKeyValue = FCMKey.value;

    let tokenSelect = document.querySelector("#tokensSelect");

    if (tokenSelect != null && deviceTokens.length > 0) {
        tokenValue = tokenSelect.value;
    } else if (tokenValue == "") {
        alert("Please enter Token");
        token.focus();
        return false;
    }

    if (fcmKeyValue == "") {
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

    let routeSelect = document.querySelector("#routeSelect");
    if (routeSelect != null && routes.length > 0) {
        let route = routeSelect.value;
        data.data.route = route;
    } else {
        if (isRoute.checked) {
            let route = document.querySelector("#routeInput").value;
            if (route != "") {
                data.data.route = route;
            } else {
                alert("Please enter Route");
                document.querySelector("#routeInput").focus();
                return false;
            }
        }
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
            if (
                xhr.status == 200 &&
                JSON.parse(xhr.responseText)["success"] == 1
            ) {
                alert("Notification sent successfully");
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
        }
    };
    return false;
}