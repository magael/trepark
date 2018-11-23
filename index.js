function login(form){
    if(form.username.value =="admin"){
        if(form.password.value="admin"){
            location ="map.html"
        }else{
            alert("wrong password")
        }
    }else{
        alert("wrong username")
    }
}