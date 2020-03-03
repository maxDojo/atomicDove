


function openLogin(){
  document.getElementById('logindiv').style.display = 'block';
}

function closeLogin(){
  document.getElementById('logindiv').style.display = 'none'
}


function openTab(evt, tabname){
    var i, tabcontent, tablinks;

    tabcontent=document.getElementsByClassName('tabcontent');

    for(i=0; i < tabcontent.length; i++){
        tabcontent[i].style.display='none';
    }
    
    tablinks=document.getElementsByClassName('tablinks');
    for(i=0; i<tablinks.length; i++){
        // document.getElementsByClassName('tablinks')[0].className+='active';
        tablinks[i].className=tablinks[i].className.replace('active', '');


        document.getElementById(tabname).style.display='block';
        evt.currentTarget.className += " active";
    }
}


function openTile(tab, tile){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            document.getElementById('maincontent').innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open('GET', "/dashboard/"+tab+"/"+tile, true);
    xmlhttp.send();
}


// function login(){
//     var login_email=document.getElementsByName('login_email')[0]
//     var login_pass=document.getElementsByName('login_pass')[0]
//     var xmlhttp = new XMLHttpRequest;
//     xmlhttp.onreadystatechange = function(){
//         if (xmlhttp.readyState==4 && xmlhttp.status==200){
//             document.getElementById('error_div').innerHTML=xmlhttp.responseText;
//         }
//     }
//     xmlhttp.open('POST', "/login", true);
//     xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     xmlhttp.send(`login_email=${login_email}&login_pass=${login_pass}`);
    
// }
 
function sendAjaxReq(method, url, data, target){
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4 && xhr.status==200){
            document.getElementById(target).innerHTML=xhr.responseText;
        }
    }
    xhr.open(method, url, true)
    xhr.send()
}
 
function login(){
    document.getElementsByClassName('loader')[0].style.display = 'block'
    document.getElementsByClassName('login-container')[0].style.display = 'none'
    var login_email=document.getElementsByName('login_email')[0].value
    var login_pass=document.getElementsByName('login_pass')[0].value
    var data = {
        login_email: login_email,
        login_pass: login_pass
    }
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            if (xmlhttp.responseText.length < 100){
                document.getElementsByClassName('loader')[0].style.display = 'none'
                document.getElementsByClassName('login-container')[0].style.display = 'block'
                document.getElementById('error_display').textContent=xmlhttp.responseText
                document.getElementById('error_display').style.display = 'block'

            }else{
                document.write(xmlhttp.responseText);
                // location.reload()
                window.history.pushState('', 'Atomic Dove | Dashboard', '/dashboard');
            }
        }
    }
    xmlhttp.open('POST', "/login", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(data));
    
}






