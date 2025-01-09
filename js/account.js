
document.querySelectorAll('.middle-page').forEach(function(element) {
    element.style.display = 'none';
});
document.getElementById("TopLoading").style.display="none";

// 启动时显示第一个页面（可以选择您的默认页面）
// 例如，默认显示 pageUserName 页面
ShowPage('pageUserName');

// 定义 ShowPage 函数
function ShowPage(PageID) {
    // 获取所有 middle-page 的列表
    const pages = Array.from(document.querySelectorAll('.middle-page'));

    // 获取即将显示的页面
    const newPage = document.getElementById(PageID);

    // 当前被显示的页面（如果有）
    const currentPage = pages.find(page => page.style.display === 'block');

    if(newPage.isEqualNode(currentPage)){
        return;
    }
    // 隐藏当前显示的页面（如果有）
    //if (currentPage) {
    //    currentPage.style.display = 'none';
    //    currentPage.classList.remove('slideInRight', 'slideInLeft'); // 移除动画类
    //}

    // 判断新的页面的索引与当前页面的索引
    const newPageIndex = pages.indexOf(newPage);
    const currentPageIndex = currentPage ? pages.indexOf(currentPage) : -1;
    // 根据索引决定动画方向
    if (currentPage) {
        currentPage.style.transform="translateX(0%)";
        if (newPageIndex > currentPageIndex) {
            // 如果新的页面在后面，从右边滑入
            //newPage.classList.add('slideInRight');
            newPage.style.animation="slideInRight 0.35s cubic-bezier(0, 0, 0.09, 1) forwards";
            currentPage.style.transform="translateX(-100%)";
        } else {
            // 如果新的页面在前面，从左边滑入
            //newPage.classList.add('slideInLeft');
            newPage.style.animation="slideInLeft 0.35s cubic-bezier(0, 0, 0.09, 1) forwards";
            currentPage.style.transform="translateX(100%)";
        }
    }

    // 显示新的页面
    newPage.style.display = 'block';

    // 用于确保动画后重置类
    newPage.addEventListener('animationend', function() {
        //newPage.classList.remove('slideInRight', 'slideInLeft');
        newPage.style.animation="";
        newPage.style.opacity = 1; // 恢复可见性
        if (currentPage) {
            currentPage.style.display="none";
            currentPage.style.transform="translateX(0)";
        }
    });

    // 如果没有当前页面，直接显示新的页面
    if (!currentPage) {
        //newPage.classList.add('slideInRight'); // 默认从右侧滑入（或可以选择不添加动画）
        newPage.style.animation="slideInRight 0.35s cubic-bezier(0, 0, 0.09, 1) forwards";
    }
}

function handleEnter(event) {
    // 检查是否按下了回车键
    if (event.key === 'Enter') {
        // 找到当前input元素
        const inputElement = event.target;

        // 找到input元素的父级元素的父级元素
        const middlePageElement = inputElement.closest('.middle-page');

        // 如果找到了middle-page元素
        if (middlePageElement) {
            // 找到其中的next-btn按钮
            const nextButton = middlePageElement.querySelector('.next-btn');

            // 如果找到了按钮，则模拟点击
            if (nextButton) {
                nextButton.click();
            }
        }
    }
}

function ProblemSlover(){
    var morebuttonmenu = document.getElementsByClassName("morebuttonmenu")[0];
    morebuttonmenu.style.width="250px";
    morebuttonmenu.style.height="120px";
    morebuttonmenu.style.display="block";
    document.getElementById("morebuttonmenubuttons").style.display="none";
    document.getElementById("morebuttonmenproblem").style.display="block";
}
function CloseProblemSlover(){
    var morebuttonmenu = document.getElementsByClassName("morebuttonmenu")[0];
    morebuttonmenu.style.width="52px";
    morebuttonmenu.style.height="66px";
    morebuttonmenu.style.display="";
    document.getElementById("morebuttonmenubuttons").style.display="block";
    document.getElementById("morebuttonmenproblem").style.display="none";
}