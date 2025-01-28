const urlParams = new URLSearchParams(window.location.search);
// 获取 type 参数的值
const typeValue = urlParams.get('type');
window.onload = function() {

    if (typeValue === 'in') {
        if (document.getElementById("logo")) {
            document.getElementById("logo").style.display = "none";
        }
        const darkValue = urlParams.get('dark');
        if(darkValue==="1") {
            document.getElementsByClassName("middle-container")[0].style.backgroundColor = "rgb(22,22,23)";
            document.getElementsByClassName("middle-container")[0].style.color = "rgb(255,255,255)";
        }
    }
}

function goSignUp(){
    if (typeValue === 'in'){
        window.location.href = 'signup.html?type=in'
    }
    else {
        window.location.href = 'signup.html'
    }
}

function goLogin(){
    if (typeValue === 'in'){
        window.location.href = 'login.html?type=in'
    }
    else {
        window.location.href = 'login.html'
    }
}
