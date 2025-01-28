// 创建 CAPTCHA 的 HTML内容
const captchaHTML = `
        <input type="checkbox" style="width: 30px;height: 30px;" required>
        <label style="margin-left: 6px;">我不是机器人</label>
    `;

const style = document.createElement('style');
style.innerHTML = `
    /* CSS 动画样式 */
    @keyframes success {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    @keyframes fail {
        0% { transform: scale(1); }
        25% { transform: scale(1.25); }
        50% { transform: scale(0.75); }
        100% { transform: scale(1); }
    }

    .success-animation {
        animation: success 0.6s ease;
        color: green;
    }

    .fail-animation {
        animation: fail 0.6s ease;
        color: red;
    }
    @keyframes validation-message-show {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    .validation-message {
        box-sizing: border-box;
        position: absolute;
        padding: 10px;
        background: var(--background-color);
        border: 1px solid #ccc;
        border-radius: 4px;
        z-index: 1000;
        animation: validation-message-show 0.15s forwards ease;
        height: 580px;
        width: 400px;
    }
`;
document.head.appendChild(style);

// 获取所有具有 class 为 'CAPTCHA' 的 div
const captchaDivs = document.querySelectorAll('.CAPTCHA');

// 为每个 div 设置 innerHTML
function setupCaptcha(div) {
    div.innerHTML = captchaHTML;

    // 设置样式
    div.style.width = '300px';                  // 设置宽度
    div.style.height = '65px';                 // 设置高度
    div.style.backgroundColor = '#f0f0f0';      // 设置背景颜色
    div.style.border = '2px solid #ccc';       // 设置边框
    div.style.borderRadius = '4px';            // 设置边角圆润
    div.style.display = 'flex';                 // 使用 flexbox 布局
    div.style.alignItems = 'center';            // 垂直居中
    div.style.padding = '10px';                 // 内边距
    div.style.boxSizing = 'border-box';         // 包含边框和内边距
    div.style.userSelect = "none";

    // 获取复选框元素
    const checkbox = div.querySelector('input[type="checkbox"]');

    // 绑定点击事件
    checkbox.addEventListener('click', function() {
        // 如果复选框被选中，替换为加载动画
        if (this.checked) {
            // 替换复选框为加载动画
            div.innerHTML = `
                    <div class="progress-ring" style="height: 30px;width: 30px;margin-left: 5px">
                        <svg xmlns="" viewBox="0 0 16 16" class="ring">
                            <circle class="static" cx="50%" cy="50%" r="43.75%"></circle>
                            <circle class="dynamic" cx="50%" cy="50%" r="43.75%"></circle>
                        </svg>
                    </div>
                    <label style="margin-left: 8px">我不是机器人</label>
                `;

            // 模拟验证过程
            simulateValidation(div);
        }
    });
}

function simulateValidation(div) {
    const success = Math.random() <= 0.5; // 50% 成功率

    const messageDiv = document.createElement('div');
    messageDiv.className = 'validation-message';

    handleResize(div,messageDiv);
    document.body.appendChild(messageDiv);

    // 监听窗口大小变化，重新计算消息位置
    window.addEventListener('resize',  () =>handleResize(div,messageDiv));

    setTimeout(function() {
        endCaptcha(div,success,messageDiv)
    }, 2000); // 模拟延迟
}
function handleResize(div,messageDiv){
    const rect = div.getBoundingClientRect();
    let spaceAbove = rect.top;
    let spaceBelow = window.innerHeight - rect.bottom;
    let spaceRight = window.innerWidth - rect.left - rect.width;
    if (spaceAbove >= 580) {
        // 上方有空间
        messageDiv.style.top = `${rect.top - 580 - 10}px`;
        messageDiv.style.left = `${rect.left}px`;
    } else if (spaceBelow >= 580) {
        // 下方有空间
        messageDiv.style.top = `${rect.bottom + 10}px`;
        messageDiv.style.left = `${rect.left}px`;
    } else if (spaceRight >= 400){
        messageDiv.style.top = "calc(50% - 290px)";
        messageDiv.style.left = `${rect.left + rect.width}px`;
    } else {
        // 中间显示
        messageDiv.style.top = "calc(50% - 290px)";
        messageDiv.style.left = "calc(50% - 200px)";
    }
}
function endCaptcha(div,success,messageDiv){
    if (success) {
        // 成功
        div.innerHTML = `
                <svg xmlns="" class="success-animation" viewBox="0 0 16 16" width="30" fill="black">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
                <label style="margin-left: 13px">我不是机器人</label>
            `;
        // 5分钟后自动失效验证码
        setTimeout(() => {
            setupCaptcha(div); // 重新设定 CAPTCHA
        }, 5 * 60 * 1000); // 5 分钟
    } else {
        // 失败
        div.innerHTML = `
                <svg xmlns="" class="fail-animation" viewBox="0 0 16 16" width="30" fill="red">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
                <label style="margin-left: 13px">我不是机器人</label>
            `;
        // 再次重置
        setTimeout(function() {
            setupCaptcha(div); // 重新设定 CAPTCHA
        }, 2000);
    }
    window.removeEventListener('resize',  () =>handleResize(div,messageDiv));
    document.body.removeChild(messageDiv);
}

// 初始化所有的 CAPTCHA
captchaDivs.forEach(div => {
    setupCaptcha(div);
});