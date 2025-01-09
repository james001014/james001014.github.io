

//Button
// 获取所有的按钮元素
var buttons = document.querySelectorAll('.button');
var mousedownTime;
// 对每个按钮元素添加事件监听器
buttons.forEach(function(button) {
    button.addEventListener('mousedown', function (e) {
        if (this.disabled) return; // 检查按钮是否被禁用
        // 记录mousedown事件发生的时间
        mousedownTime = new Date().getTime();

        // 创建波纹元素
        var ripple = document.createElement('div');
        ripple.className = 'ripple slow';

        // 根据按钮的类别添加相应的波纹类
        if (button.classList.contains('btn-primary')) {
            ripple.classList.add('ripple-primary');
        } else if (button.classList.contains('btn-white')) {
            ripple.classList.add('ripple-white');
        }

        // 计算点击位置
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        // 设置波纹元素的位置和初始大小
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = 0;
        ripple.style.height = 0;

        // 添加波纹元素到按钮中
        this.appendChild(ripple);

        // 开始慢速扩散动画
        requestAnimationFrame(function () {
            ripple.style.width = rect.width + 'px';
            ripple.style.height = rect.width + 'px';
            ripple.style.left = x - rect.width / 2 + 'px';
            ripple.style.top = y - rect.width / 2 + 'px';
        }); // 使用requestAnimationFrame来优化动画

        ripple.addEventListener('transitionend', function () {
            this.remove(); // 动画结束后移除波纹元素
        });
    });

    button.addEventListener('mouseup', function () {
        changeRippleSpeed();
    });

    button.addEventListener('mouseleave', function () {
        changeRippleSpeed();
    });
});

function changeRippleSpeed() {
    // 计算mousedown和mouseup事件之间的时间差
    var mouseupTime = new Date().getTime();
    var timeDiff = mouseupTime - mousedownTime;

    // 找到所有的波纹元素
    var ripples = document.querySelectorAll('.ripple.slow');

    // 改变所有波纹元素的动画速度
    ripples.forEach(function (ripple) {
        var rippleColorClass = ripple.classList.contains('ripple-primary') ? 'ripple-primary' : 'ripple-white';
        if (timeDiff < 200) {
            // 如果用户快速点击了按钮，使用一个较慢的动画
            ripple.className = 'ripple slower ' + rippleColorClass;

        } else {
            ripple.className = 'ripple fast ' + rippleColorClass;
        }

        // 动画结束后移除波纹元素，并显示反馈信息
        setTimeout(function () {
            ripple.remove();
            console.log('Ripple animation ended.'); // 添加回调函数
        }, 300);
    });
}