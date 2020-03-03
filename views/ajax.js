// function UpdateChat() {

//         var xmlhttp = new XMLHttpRequest();
//         xmlhttp.onreadystatechange = function() {
//             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                 document.getElementById("maincontent").innerHTML = xmlhttp.responseText;
// 				scrollchat(z);
//             }
//         };
//         xmlhttp.open("GET", "updatechat.php?p=1", true);
//         xmlhttp.send();
// }
function army() {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("maincontent").innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET", "military/army.ejs", true);
        xmlhttp.send();
}
console.log('Hello from the ajax file');