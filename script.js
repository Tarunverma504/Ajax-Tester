document.addEventListener("DOMContentLoaded", function (event) {
    document.querySelector('#btn').addEventListener('click', makeRequest)
});

function makeRequest()
{
    var url = document.querySelector('#url').value;
    var resource = document.querySelector('#resource').value;
    var method = document.querySelector('#method').value;
    var formd = $('#myForm').serialize()
    
    switch (resource) {
        case "jQuery":
            ajaxJQ(url, method, formd);
            break;
        case "Axios":
            ajaxAX(url, method, formd);
            break;
        case "Fetch":
            ajaxFe(url, method, formd);
            break;
        default:
            ajaxJS(url, method, formd);
        }   
}


function ajaxJQ(url, method, formd) {
    $.ajax({
        url: url
        , type: method
        , data: formd
        , success: function (data) {
     }
    }).done(function (response, textStatus, xhr) {
        output(response, xhr.status, 'jQuery response')
    }).fail(function (response, textStatus, xhr) {
        output(response, xhr.status, 'jQuery ERROR')
    })
}

function  ajaxAX(url, method, formd){
    axios({

        method: method
        , url: url
        ,data:formd
         }).then(function (response) {
             output(response.data, response.status, 'Axios response')
                }).catch(function(error){
                    output(response.data, response.status, 'Axios FAIL')
                    })
}



function ajaxFe(url, method, formd){
    var para = method == 'POST' ? {
        method:method,
        body:formd,
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    }:{}

    fetch(url,para).then((response)=>{ return response.json()})
        .catch((error)=>{return output(error, '0' ,'Fetch AJAX')})
            .then((response)=>{ return output(response, '200' ,'Fetch AJAX')})

}


function ajaxJS(url, method, formd){
    var xhr= new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4)
        {
            
            if(xhr.status==200){
                output(xhr.responseText, xhr.status, 'JavaScript response');
            }
            else if (xhr.status == 201) {
                output(xhr.responseText, xhr.status, 'JavaScript Added')
            }
            else {
                output(xhr.responseText, xhr.status, 'JavaScript Error')
            }
        }
    }
    if(method == 'GET'){
        xhr.open('GET',url,true);
        xhr.send();
    }
    else{
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(formd);
    }
}



function output(responseText, status, xhr) {
    var output = document.getElementById('output');
    
    console.log(responseText);
    console.log('%c' + status, "color:green");
    console.log('%c' + xhr , "color:red");
    responseText = ((typeof responseText) == 'string') ? JSON.parse(responseText) : responseText;
    $('#api-text').text(JSON.stringify(responseText));
    $("#api-status").text(JSON.stringify(status));
    $("#api-response").text(JSON.stringify(xhr));
   

}
/*$("#copy-text").on('click',function(){
    var copyText = document.getElementById("api-text");
    copyText.select();
    //copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");

    
})*/

//document.getElementById("#copy-text").addEventListener("click", copy_password);
$("#copy-text").on('click',copy_password)
function copy_password() {
    var copyText = document.getElementById("api-text");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}