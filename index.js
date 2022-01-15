(function () {
    $(document).ready(function () {

        var inputCode = $("#inputCode");
        var imgCode = $("#imgCode");
        var qrCode;
        var url;

        if (chrome && chrome.tabs) {
            var queryOptions = { active: true, currentWindow: true };
            chrome.tabs.query(queryOptions)
                .then(([tab]) => {
                    url = tab.url;
                });
        }


        // 获取剪贴板内容
        navigator.permissions.query({
            name: 'clipboard-read'
        })
            .then(status => {
                if (status && status.state == "granted") {
                    navigator.clipboard.readText()
                        .then(text => {
                            inputCode.val(text);
                        });
                }
            })
            .catch(err => {
                console.log(err);
            })


        //生成二维码点击事件
        $("#btnGenCode").click(function () {
            var text = inputCode.val();
            if (!text) {
                alert("请先输入内容！");
                return;
            }
            genQRCode(text, imgCode);
        })

        // 快速生成二维码
        $("#btnQuickGenCode").click(function () {
            if (!url) {
                alert("无法获取当前页面url!");
                return;
            }
            genQRCode(text, imgCode);
        });

        function genQRCode(text, imgCode) {
            try {
                if (qrCode) {
                    qrCode.clear();
                    qrCode.makeCode(text);
                } else {
                    qrCode = new QRCode(imgCode[0], text);
                }
            } catch (error) {
                var message = error.message || "未知错误";
                if (message.indexOf("code length overflow") > -1) {
                    message = "字数过多！";
                }
                alert(message);
            }
        }
    })
})();