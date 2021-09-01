function makeAJAXCall(methodType, url, async=true, data=null){
    return new Promise((resolve, reject) =>{
        
        const xhttp  = new XMLHttpRequest();

        xhttp.onreadystatechange = function(){
            // console.log(xhttp.readyState)
            if(xhttp.readyState == 4){
                if(xhttp.status >= 200 && xhttp.status < 300){
                    resolve(xhttp.responseText)
                }
                else{
                    reject(new Error('Failure response'));
                }
            }
        }


        xhttp.open(methodType, url, async);

        // for adding
        if(data){
            xhttp.setRequestHeader("Content-Type","application/json");
            xhttp.send(JSON.stringify(data));
        } else {
            xhttp.send(); //normal
        }
    });
}