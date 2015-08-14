/// 依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
var iconv = require('iconv-lite');
var async = require('async');
var color = require('./color.js');
var path = require('path');
var URL = require('url');

/// 配置文件
var config = require('./config.js');
var rooturl = config.isPagination ? function(i) {
    return config.url.replace('%', i);
} : config.url;

var rootsite = config.url.match(/[^\.]+[^/]+/)[0];
var hostname = URL.parse(rootsite).hostname;

var Crawler = function() {
    this.from = config.from || 1;
    this.to = config.to || 1;
};

/// 开始处理的入口
Crawler.prototype.crawl = function() {
    var that = this;
    var second = 0;
    that.log('程序正在执行中...');

    var timer = null;
    timer = setInterval(function() {
        if (second > -1) {
            that.request(rooturl(1), function(status, $) {
                if (status) {
                    that.log('第' + second + '次分析完成', 'green');
                    that.log($, 'green', true);
                } else {
                    that.log(rooturl(1) + '请求失败', 'red');
                }
            });
        } else {
            clearInterval(timer);
        }
        second += 1;
    }, 10000);
};

/// 处理text
/// urls:{Array}
Crawler.prototype.text = function(urls) {
    var that = this;
    that.log('抓取文本中...');
    var i = 0;
    var count = urls.length;
    mkdirp(config.saveDir + '/' + hostname, function(err) {
        if (err) {
            that.log('创建目录失败', 'red');
            process.exit(0);
        } else {
            async.whilst(function() {
                return i < urls.length;
            }, function(callback) {
                var uri = urls[i];
                that.log('获取文uri：' + uri);
                that.request(uri, function(status, $) {
                    that.log('获取文本状态：' + status);
                    if (status) {
                        var title = that.title($("title").text());
                        var filepath = path.join(config.saveDir, hostname, title + '.txt');
                        var last = config.selector[config.selector.length - 1];
                        var content = eval(last.$).text();
                        that.log('content', eval(last.$));
                        fs.writeFile(filepath, content, {
                            flag: 'wx'
                        }, function(_err) {
                            if (_err) {
                                if (_err.code === 'EEXIST') {
                                    that.log('文件' + filepath + '已存在', 'yellow');
                                } else {
                                    that.log('保存文件' + filepath + '失败', 'red');
                                }
                            } else {
                                that.log(i + '/' + count + ' 文件' + filepath + '保存成功', 'green');
                            }
                            setTimeout(callback, parseInt(Math.random() * 2000));
                        });
                    } else {
                        setTimeout(callback, parseInt(Math.random() * 2000));
                    }
                });
                ++i;
            }, function(err) {
                if (err) {
                    that.log(err, "red");
                } else {
                    that.log('执行完毕~', "green");
                }
            });
        }
    });
};

/// 处理image
/// urls:{Array}
Crawler.prototype.image = function(urls) {
    var that = this;
    that.log('抓取图片中...');
    var i = 0;
    var count = urls.length;
    async.whilst(function() {
        return i < count;
    }, function(callback) {
        var uri = urls[i];
        that.request(uri, function(status, $) {
            var list = []; /// 存储图片路径
            if (status) {
                var last = config.selector[config.selector.length - 1];
                var $$ = eval(last.$);
                var len = $$.length;
                if (len > 0) {
                    $$.each(function() {
                        list.push({
                            url: $(this).attr(last.attr),
                            title: that.title($("title").text())
                        });
                    });
                }
                that.log('第{0}套图片收集了{1}张图片'.format((i + 1) + '/' + count, $$.length));
                that.dlImage(list, function() {
                    ++i;
                    callback();
                });
            } else {
                ++i;
                callback();
                that.log('页面' + uri + '请求失败', 'redBG');
            }
        });
    }, function(err) {
        if (err) that.log('imageError:' + err);
        process.exit(0);
    });
};

/// 下载图片
Crawler.prototype.dlImage = function(list, callback) {
    var that = this;
    var count = list.length;
    that.log('准备下载到本地中...');
    if (count < 1) {
        callback();
        return;
    }
    async.eachSeries(list, function(item, callback) {
        var filename = item.url.match(/[^\/]+\.\w{3,4}$/)[0];
        var filepath = path.join(config.saveDir, item.title);
        mkdirp(filepath, function(err) {
            if (err) {
                callback(err);
            } else {
                request.head(item.url, function(err, res, body) {
                    var url = config.imageFn ? config.imageFn(item.url) : item.url;
                    var savePath = path.join(filepath, filename);
                    fs.exists(savePath, function(exists) {
                        if (exists) {
                            that.log(savePath + '已存在', 'yellow');
                            callback();
                        } else {
                            request(url).pipe(fs.createWriteStream(savePath));
                            that.log((list.indexOf(item) + 1) + '/' + count + '  ：' + path.join(filepath, filename) + '保存成功', 'green');
                            setTimeout(callback, parseInt(Math.random() * 2000));
                        }
                    });
                });
            }
        });
    }, function(err) {
        if (err) {
            that.log(err, "red");
        } else {
            that.log(list[0].title + ' ：下载完毕~', "greenBG");
        }
        callback();
    });
};

/// 获取页面
/// url:{String} 页面地址
/// callback:{Function} 获取页面完成后的回调callback(boolen,$)
Crawler.prototype.request = function(url, callback) {
    var that = this;

    var opts = {
        url: url,
        encoding: config.charset || 'utf8'
    };

    config.headers && (opts.headers = config.headers);

    that.log('发送' + url + '，等待响应中...', 'grey');
    // iconv.extendNodeEncodings(); /// 转码用
    request(opts, function(err, res, body) {
        var $ = null;
        if (!err && res.statusCode == 200) {
            $ = body;
        } else {
            !err && that.log(res.statusCode, 'red');
        }
        // iconv.undoExtendNodeEncodings();
        callback(!!$, $);
    });
};

/// 处理标题(title)
// Crawler.prototype.title = function (str) {
//     var title = str.replace(/[\\/:\*\?"<>\|\n\r]/g, '').trim();
//     if (/-/.test(title)) {
//         title = title.match(/(.+)\-[^\-]+$/)[1].trim();
//     }

//     return title;
// };

/// 输出信息
Crawler.prototype.log = function(info, c, html) {
    var that = this;
    if (html) {
        process.send(JSON.stringify({
            color: c,
            info: info,
            html: true
        })); /// 发送数据给主进程
    } else {
        if (config.mode === 'web') {
            process.send(JSON.stringify({
                color: c,
                info: info
            })); /// 发送数据给主进程
        } else if (config.mode === 'console') {
            console.log(color(c), info);
        }
    }
};

String.prototype.format = function() {
    var formatted = this;
    var length = arguments.length;
    for (var i = 0; i < length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        var value = arguments[i];
        if (value === null || value === undefined)
            value = '';
        formatted = formatted.replace(regexp, value);
    }
    return formatted;
};

new Crawler().crawl();
//module.exports = Crawler;
