var ws = new WebSocket("ws://+window.location.host + window.location.pathname +websocket");


function sendMessage() {
    var messageInput = document.getElementById("message");
    var message = messageInput.value;
    console.log(message)
    var payload = {
        "message": message,
        "user": localStorage.getItem('user')
    }

    if (message == "") {
        console.log('empty')
    } else {
        ws.send(JSON.stringify(payload));
    }


    messageInput.value = "";
    return false;
}

ws.onmessage = function(evt) {
    var messageDict = JSON.parse(evt.data);
    if (messageDict.user == localStorage.getItem('user')) {
        var component = document.createElement('div');
        component.setAttribute('class', 'outgoing_msg')
        var sub_component = document.createElement('div');
        sub_component.setAttribute('class', 'sent_msg')
        var data_holder = document.createElement('p')
        var data = document.createTextNode("You sent: " + messageDict.message)
        data_holder.append(data)
        sub_component.append(data_holder)
        component.append(sub_component)
        document.getElementById("messages").appendChild(component);

    } else {

        var component = document.createElement('div');
        component.setAttribute('class', 'incoming_msg')
        var sub_component = document.createElement('div');
        sub_component.setAttribute('class', 'received_msg')
        var min_componenet = document.createElement('div');
        min_componenet.setAttribute('class', 'received_withd_msg')
        var data_holder = document.createElement('p')
        var data = document.createTextNode("user " + messageDict.user + ' send: ' + messageDict.message)
        data_holder.append(data)
        min_componenet.append(data_holder)
        sub_component.append(min_componenet)
        component.append(sub_component)
        document.getElementById("messages").appendChild(component);

    }



};
