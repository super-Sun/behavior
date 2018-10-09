(function (window, $) {
    /**
     * 人机交互-行为验证
     * 验证用户是否在查看当前页面
     * @constructor
     */
    function Behavior (ops) {
        // 定时器
        this.timer = null
        this.index = 0
        // 默认值
        var options = {
            countdown: 15, // *倒计时
            text: '秒内未点击屏幕，系统将自动退出！',
            duration: 10, // *倒计时时间间隔,接受类型： Number 或者 Array <Number>
            // 循环次数
            loop: 0, // -1：表示无限循环、0：表示不循环、所有正整数都有效的循环次数
            // 倒计时事件触发
            onStart: function () {
            },
            // 点击屏幕时间
            onClick: function () {
            },
            // 超时未点击屏幕触发的事件
            onTimeout: function () {
            }
        }
        $.extend(options, ops)
        if (options.duration instanceof Array) {
            // duration为数组时，不循环
            options.loop = 0
        } else {
            options.duration = [+options.duration]
        }
        // 时间间隔传入数组的情况下，该长度为数组的长度
        this.length = options.duration.length
        this.options = options
        this.init(options)
    }

    // 初始化
    Behavior.prototype.init = function () {
        var self = this
        var $cover = $('<div class="bh-dialog-cover"></div>').click(function () {
            clearTimeout(self.timer)
            self.timer = null
            $(this).removeClass('show').hide()
            var idx = self.index
            self.index++
            if (self.length > idx + 1 || (self.options.loop > idx)) {
                // 再次执行定时任务
                self.start()
            }
            self.options.onClick(idx)

        })
        var $mask = $('<div class="bh-mask"></div>')
        var $dialog = $('<div class="bh-dialog"></div>')
        var $img = $('<div class="bh-img-box"><img src="./behavior/icon_01.png" /></div>')
        var $content = $('<div class="bh-content"></div>')
        $dialog.append($img)
        $dialog.append($content)
        $cover.append($mask)
        $cover.append($dialog)
        $('body').append($cover)
        this.$cover = $cover
        this.start()
    }
    // 开始
    Behavior.prototype.start = function () {
        // 1.开启定时器：间隔为self.options.duration
        // 2.定时器结束倒计时框展示
        // 3.判断有没有点击
        var self = this
        var duration = self.options.duration[this.index] || self.options.duration[0]
        var countdown = self.options.countdown
        var text = self.options.text
        var wait = duration + countdown
        var $cover = self.$cover
        var $content = self.$cover.find('.bh-content')

        function time () {
            if (wait === 0) {
                clearTimeout(self.timer)
                $cover.removeClass('show').hide()
                $content.text(countdown + text)
                // 执行超时事件
                self.options.onTimeout(self.index)
            } else if (wait <= countdown) {
                if (!$cover.hasClass('show')) {
                    self.options.onStart(self.index)
                }
                $cover.addClass('show')
                $cover.show()
                $content.text(wait + text)
                wait--
                if (self.timer) clearTimeout(self.timer)
                self.timer = setTimeout(function () {
                    time()
                }, 1000)
            } else {
                wait--
                if (self.timer) clearTimeout(self.timer)
                self.timer = setTimeout(function () {
                    time()
                }, 1000)
            }
        }

        time()
    }
    Behavior.prototype.stop = function () {
        clearTimeout(this.timer)
        this.timer = null
        this.$cover.hide()
    }
    Behavior.prototype.reset = function () {
        clearTimeout(this.timer)
        this.timer = null
        this.$cover.hide()
        this.index = 0
    }
    Behavior.prototype.reStart = function () {
        clearTimeout(this.timer)
        this.timer = null
        this.index = 0
        this.start()
    }
    Behavior.prototype.destroy = function () {
        clearTimeout(this.timer)
        this.timer = null
        this.index = 0
        this.$cover.unbind()
        this.$cover.remove()
    }
    window.Behavior = Behavior
})(window, jQuery)
