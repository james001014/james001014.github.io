window.onload=function (){
    if(cookieExists("EnableColorfulMode")){
        if (getCookie("EnableColorfulMode")==="1"){
            if (getComputedStyle(document.documentElement).getPropertyValue('--background-rgb') === "255,255,255") {

                document.getElementsByClassName("MainHeader")[0].style.background = "linear-gradient(to right, #caeefb54, #a2e0f185, #d9f2d08c)";
            } else {
                document.getElementsByClassName("MainHeader")[0].style.background = "linear-gradient(to right, #163e64, #0565ad, #13501b)";
            }
            ColorfulModeEnable=true;
            document.getElementById("ColorfulSide").checked=true;
        }
        else{
            document.getElementsByClassName("MainHeader")[0].style.background = "";
            ColorfulModeEnable=false;
            document.getElementById("ColorfulSide").checked=false;
        }
    }

    if(cookieExists("EnableDarkMode")){
        if (getCookie("EnableDarkMode")==="1"){
            document.documentElement.style.setProperty('--background-rgb',"22,22,23");
            document.documentElement.style.setProperty('--text-rgb',"255,255,255");
            document.documentElement.style.setProperty('--hover-color',"rgb(61,61,62)");
            document.getElementsByClassName("HeaderLogo")[0].src="/image/darklogowithtext.svg";
            document.getElementById("DarkModeSide").checked=true;
            if (ColorfulModeEnable) {
                document.getElementsByClassName("MainHeader")[0].style.background = "linear-gradient(to right, #163e64, #0565ad, #13501b)";
            }
        }
        else{
            document.documentElement.style.setProperty('--background-rgb',"255,255,255");
            document.documentElement.style.setProperty('--text-rgb',"0,0,0");
            document.documentElement.style.setProperty('--hover-color',"rgb(210,212,212)");
            document.getElementsByClassName("HeaderLogo")[0].src="/image/logowithtext.svg";
            document.getElementById("DarkModeSide").checked=false;
            if (ColorfulModeEnable) {
                document.getElementsByClassName("MainHeader")[0].style.background = "linear-gradient(to right, #caeefb54, #a2e0f185, #d9f2d08c)";
            }
        }
    }
    document.getElementById("TopLoading").style.display = "none";
};












var mobilemenuback=document.createElement("div");
mobilemenuback.className="grayback"
mobilemenuback.style.zIndex = "9999";
var mobilemenu=document.getElementsByClassName("MobileMenu")[0];
document.getElementsByClassName("menubutton")[0].addEventListener("click", function (event) {

    if(mobilemenu.style.left==="0px"){
        mobilemenu.style.left="-300px";
        document.body.removeChild(mobilemenuback);
    }
    else{
        mobilemenu.style.left="0px";
        document.body.appendChild(mobilemenuback);
    }
})
// 获取所有 class 为 'MoreButton' 的按钮
const MoreButton = document.querySelectorAll('.MoreButton,.headerrightBtn');
let MoreButtonLintener;

// 定义全局监听器函数
function closeMenu(event, button, element) {
    if (!button.contains(event.target) && !element.contains(event.target)) {
        // 模拟点击当前按钮，关闭菜单
        button.click();
        // 移除全局监听器
        document.removeEventListener('click', MoreButtonLintener);
    }
}

// 遍历每个按钮，绑定点击事件
MoreButton.forEach(button => {
    button.addEventListener('click', function() {
        const element = document.getElementById(this.getAttribute('data-id'));

        // 如果有一个按钮已经显示了菜单，关闭所有菜单
        MoreButton.forEach(otherButton => {
            const otherElement = document.getElementById(otherButton.getAttribute('data-id'));
            if (otherElement && otherElement !== element) {
                if (otherElement.style.transform === "translateY(1%)"){
                    otherElement.style.transform = "translateY(-100%)";

                    otherElement.style.opacity="0";

                    otherButton.style.backgroundColor = "";
                    otherButton.style.color = "";
                    // 移除全局监听器
                    document.removeEventListener('click', MoreButtonLintener);
                }

            }
        });

        if (element) {
            if (element.style.transform === "translateY(1%)") {
                element.style.transform = "translateY(-100%)";
                element.style.opacity="0";
                this.style.backgroundColor = "";
                this.style.color = "";
                // 移除全局监听器
                document.removeEventListener('click', MoreButtonLintener);
            } else {
                element.style.transform = "translateY(1%)";
                element.style.opacity="1";
                this.style.backgroundColor = "var(--primary-color)";
                this.style.color = "var(--primary-text-color)";
                // 添加全局点击事件监听器，点击其他地方时模拟点击当前按钮
                MoreButtonLintener = function(event) {
                    closeMenu(event, button, element);
                };
                document.addEventListener('click', MoreButtonLintener);
            }
        }
    });
});
mobilemenuback.addEventListener("click",function (event) {
    document.getElementsByClassName("menubutton")[0].click();
})
window.onresize = function () {
    if(mobilemenu.style.left==="0px"){
        mobilemenu.style.left="-300px";
        document.body.removeChild(mobilemenuback);
    }
}
function showMobileMenuDrop(Dropid){
    var mobileMenuDrop = document.getElementsByClassName("mobileMenuDrop");
    for( var y = 0, j = mobileMenuDrop.length; y < j; y++){
        if(mobileMenuDrop[y].dataset.id===Dropid){
            if(mobileMenuDrop[y].style.display==="block"){
                mobileMenuDrop[y].style.display="none";
                document.getElementById(Dropid).getElementsByTagName("svg")[0].style.transform = "rotate(0deg)";
            }
            else {
                mobileMenuDrop[y].style.display="block";
                document.getElementById(Dropid).getElementsByTagName("svg")[0].style.transform = "rotate(180deg)";
            }
        }
    }
}
document.querySelectorAll(".HeaderMenuButton,.MobileButtonLeft").forEach(button => {
    button.addEventListener('click', function (event) {
        const menu = document.getElementById(this.getAttribute('data-id'));
        if (menu) {
            menu.style.transform = menu.style.transform === "translateX(0%)" ? "translateX(100%)" : "translateX(0%)";
        }
    });
})
document.querySelectorAll(".subPageMenuCloseButton").forEach(button => {
    button.addEventListener('click', function (event) {
        var subPageMenu = document.getElementsByClassName("subPageMenu");
        for( var y = 0, j = subPageMenu.length; y < j; y++){
            subPageMenu[y].style.transform = "translateX(100%)";
        }
    })
})
document.querySelectorAll(".MenuLink").forEach(button => {
    const MenuLinkMenu = document.getElementById(button.getAttribute('data-id'));

    if (MenuLinkMenu) {
        button.addEventListener("mouseover", function (event) {
            MenuLinkMenu.style.transform = "translateY(0%)";
            MenuLinkMenu.style.opacity = "1";
            MenuLinkMenu.style.left = (this.getBoundingClientRect().left - (MenuLinkMenu.style.width / 2)).toString() + "px";
        });

        button.addEventListener("mouseleave", function (event) {
            checkIfHideMenu();
        });

        MenuLinkMenu.addEventListener("mouseleave", function (event) {
            checkIfHideMenu();
        });

        function checkIfHideMenu() {
            const isMouseOverButton = button.matches(':hover');
            const isMouseOverMenu = MenuLinkMenu.matches(':hover');

            if (!isMouseOverButton && !isMouseOverMenu) {
                MenuLinkMenu.style.transform = "translateY(-100%)";
                MenuLinkMenu.style.opacity = "0";
            }
        }
    }
})
let ColorfulModeEnable=false;
function ColorfulMode(){
    if (ColorfulModeEnable){
        document.getElementsByClassName("MainHeader")[0].style.background = "";
        ColorfulModeEnable=false;
        setCookie("EnableColorfulMode","0");
    }
    else {
        if (getComputedStyle(document.documentElement).getPropertyValue('--background-rgb') === "255,255,255") {

            document.getElementsByClassName("MainHeader")[0].style.background = "linear-gradient(to right, #caeefb54, #a2e0f185, #d9f2d08c)";
        } else {
            document.getElementsByClassName("MainHeader")[0].style.background = "linear-gradient(to right, #163e64, #0565ad, #13501b)";
        }
        ColorfulModeEnable=true;
        setCookie("EnableColorfulMode","1");
    }
}
function darkmode(){
    if(getComputedStyle(document.documentElement).getPropertyValue('--background-rgb')==="255,255,255"){
        document.documentElement.style.setProperty('--background-rgb',"22,22,23");
        document.documentElement.style.setProperty('--text-rgb',"255,255,255");
        document.documentElement.style.setProperty('--hover-color',"rgb(61,61,62)");
        document.getElementsByClassName("HeaderLogo")[0].src="/image/darklogowithtext.svg";
        document.getElementById("DarkModeSide").checked=true;
        if (ColorfulModeEnable) {
            document.getElementsByClassName("MainHeader")[0].style.background = "linear-gradient(to right, #163e64, #0565ad, #13501b)";
        }
        setCookie("EnableDarkMode","1");
    }
    else {
        document.documentElement.style.setProperty('--background-rgb',"255,255,255");
        document.documentElement.style.setProperty('--text-rgb',"0,0,0");
        document.documentElement.style.setProperty('--hover-color',"rgb(210,212,212)");
        document.getElementsByClassName("HeaderLogo")[0].src="/image/logowithtext.svg";
        document.getElementById("DarkModeSide").checked=false;
        if (ColorfulModeEnable) {
            document.getElementsByClassName("MainHeader")[0].style.background = "linear-gradient(to right, #caeefb54, #a2e0f185, #d9f2d08c)";
        }
        setCookie("EnableDarkMode","0");
    }
}
function disableanimation(){
    if(getComputedStyle(document.documentElement).getPropertyValue('--animation-duration')==="0.15s"){
        document.documentElement.style.setProperty('--animation-duration',"0");
        document.getElementById("DisableAnimation").checked=true;
    }
    else {
        document.documentElement.style.setProperty('--animation-duration',"0.15s");
        document.getElementById("DisableAnimation").checked=false;
    }
}
function disablevisible(){
    if(getComputedStyle(document.documentElement).getPropertyValue('--border-radius')==="4px"){
        document.documentElement.style.setProperty('--border-radius',"0");
        document.getElementById("DisableVisible").checked=true;
    }
    else {
        document.documentElement.style.setProperty('--border-radius',"4px");
        document.getElementById("DisableVisible").checked=false;
    }
}
function enablehighcontrast() {
    if(getComputedStyle(document.documentElement).getPropertyValue('--background-rgb')==="0,0,0"){
        document.documentElement.style.setProperty('--background-rgb',"255,255,255");
        document.documentElement.style.setProperty('--text-rgb',"0,0,0");
        document.documentElement.style.setProperty('--hover-color',"rgb(210,212,212)");
        document.documentElement.style.setProperty('--primary-text-color',"rgb(255,255,255)");
        document.documentElement.style.setProperty('--background-opacity',"0.75");
        document.documentElement.style.setProperty('--primary-rgb',"0, 119, 211");
        document.documentElement.style.setProperty('--Contrast-border',"none");
        document.getElementsByClassName("MainHeader")[0].style.background = "";
        document.getElementById("DarkModeSide").checked=false;
        document.getElementsByClassName("HeaderLogo")[0].src="/image/logowithtext.svg";
        document.getElementById("EnableHighContrast").checked=false;
        document.getElementById("DarkModeSide").disabled=false;
        document.getElementById("ColorfulSide").checked=false;
        document.getElementById("ColorfulSide").disabled=false;
        ColorfulModeEnable=false;
    }
    else {
        document.documentElement.style.setProperty('--background-rgb',"0,0,0");
        document.documentElement.style.setProperty('--text-rgb',"255,255,255");
        document.documentElement.style.setProperty('--hover-color',"rgb(61,61,62)");
        document.documentElement.style.setProperty('--primary-text-color',"rgb(0,0,0)");
        document.documentElement.style.setProperty('--background-opacity',"1");
        document.documentElement.style.setProperty('--primary-rgb',"255, 255, 51");
        document.documentElement.style.setProperty('--Contrast-border',"1px solid yellow");
        document.getElementsByClassName("MainHeader")[0].style.background = "";
        document.getElementById("DarkModeSide").checked=false;
        document.getElementById("EnableHighContrast").checked=true;
        document.getElementsByClassName("HeaderLogo")[0].src="/image/darklogowithtext.svg";
        document.getElementById("DarkModeSide").disabled=true;
        document.getElementById("ColorfulSide").checked=false;
        document.getElementById("ColorfulSide").disabled=true;
        ColorfulModeEnable=false;
    }
}
function EnableBiggerFont(){
    if (getComputedStyle(document.documentElement).getPropertyValue('--font-sizr')==="18px"){
        document.documentElement.style.setProperty('--font-sizr', "14px");
        document.documentElement.style.setProperty('--font-sizr-big', "16px");
        document.documentElement.style.setProperty('--font-sizr-bigger', "20px");
        document.documentElement.style.setProperty('--font-sizr-bigger-f', "24px");
        document.documentElement.style.setProperty('--font-sizr-bigger-s', "28px");
        document.documentElement.style.setProperty('--font-sizr-bigger-t', "32px");
        document.documentElement.style.setProperty('--font-sizr-biggest', "36px");
        document.documentElement.style.setProperty('--font-sizr-small', "10px");
        document.documentElement.style.setProperty('--font-sizr-smaller', "8px");
        document.documentElement.style.setProperty('--font-sizr-smaller-f', "4px");
        document.documentElement.style.setProperty('--font-sizr-smaller-f', "6px");
        document.documentElement.style.setProperty('--font-sizr-smallest', "2px");
    }else {
        document.documentElement.style.setProperty('--font-sizr', "18px");
        document.documentElement.style.setProperty('--font-sizr-big', "20px");
        document.documentElement.style.setProperty('--font-sizr-bigger', "24px");
        document.documentElement.style.setProperty('--font-sizr-bigger-f', "28px");
        document.documentElement.style.setProperty('--font-sizr-bigger-s', "32px");
        document.documentElement.style.setProperty('--font-sizr-bigger-t', "36px");
        document.documentElement.style.setProperty('--font-sizr-biggest', "40px");
        document.documentElement.style.setProperty('--font-sizr-small', "14px");
        document.documentElement.style.setProperty('--font-sizr-smaller', "12px");
        document.documentElement.style.setProperty('--font-sizr-smaller-f', "10px");
        document.documentElement.style.setProperty('--font-sizr-smaller-f', "8px");
        document.documentElement.style.setProperty('--font-sizr-smallest', "6px");
    }
}

function changeFont(selectElement) {
    const allElements = document.querySelectorAll('*'); // 选择所有元素
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const fontId = selectedOption.getAttribute('data-id');

    let fontFamily;

    switch (fontId) {
        case 'serif':
            fontFamily = 'Georgia, serif';
            break;
        case 'sans-serif':
            fontFamily = 'Arial, sans-serif';
            break;
        case 'monospace':
            fontFamily = 'monospace';
            break;
        case 'browser':
            fontFamily = 'initial';
            break;
        default:
            fontFamily = 'IBMPlexSans, sans-serif'; // 默认字体
            break;
    }

    // 遍历所有元素，设置字体
    allElements.forEach(element => {
        element.style.fontFamily = fontFamily;
    });
}

function changePrimaryColor(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const colorId = selectedOption.getAttribute('data-id');

    switch (colorId) {
        case 'blue':
            document.documentElement.style.setProperty('--primary-rgb', "0, 119, 211");
            document.documentElement.style.setProperty('--primary-text-color', "rgb(255,255,255)");
            break;
        case 'green':
            document.documentElement.style.setProperty('--primary-rgb', "0,202,0");
            document.documentElement.style.setProperty('--primary-text-color', "rgb(255,255,255)");
            break;
        case 'yellow':
            document.documentElement.style.setProperty('--primary-rgb', "255, 185, 15");
            document.documentElement.style.setProperty('--primary-text-color', "rgb(255,255,255)");
            break;
        case 'red':
            document.documentElement.style.setProperty('--primary-rgb', "255,0,0");
            document.documentElement.style.setProperty('--primary-text-color', "rgb(255,255,255)");
            break;
        case 'pink':
            document.documentElement.style.setProperty('--primary-rgb', "255,105,180");
            document.documentElement.style.setProperty('--primary-text-color', "rgb(255,255,255)");
            break;
        default:
            // 默认颜色（蓝色）
            document.documentElement.style.setProperty('--primary-rgb', "0, 119, 211");
            document.documentElement.style.setProperty('--primary-text-color', "rgb(255,255,255)");
            break;
    }
}

