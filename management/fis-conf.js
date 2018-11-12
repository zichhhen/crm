/**
 * @file FIS 配置
 * @author
 */

fis.config.set('namespace', 'management');

// chrome下可以安装插件实现livereload功能
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
fis.config.set('livereload.port', 35729);
fis.set('project.fileType.text', 'es');

fis.match('client/static/common/{ui,util}/**.{es,ts,js}', {
    isMod: 1
}).match('client/static/common/vendor/mod.js', {
    packOrder: -100
}).match('client/static/common/vendor/zepto.js', {
    packOrder: -99
}).match('client/static/common/vendor/zepto.extend.js', {
    packOrder: -98
}).match('client/static/common/vendor/jquery.js', {
    packOrder: -99
}).match('client/static/common/vendor/jquery.extend.js', {
    packOrder: -98
}).match('client/static/**/js/**.{es,ts,js}', {
    isMod: 1
}).match('client/**.{less,vue:less}', {
    rExt: 'css',
    parser: fis.plugin('less'),
    postprocessor: fis.plugin('less-autoprefix', {
        browsers: ['last 20 versions']
    })
}).match('client/**.{es,ts}', {
    isMod: true,
    parser: fis.plugin('typescript', {
        module: 1,
        target: 1,
        sourceMap: false
    })
}).match('client/**.templ', {
    isJsLike: true,
    parser: fis.plugin('template', {
        sTag: '<%',
        eTag: '%>',
        global: 'template'
    }),
    release: false
}).match('server/conf/({ral,plugins,fis,user}/**.{es,ts,js})', {
    release: '${config}/$1'
}).match('server/(plugins/**)', {
    release: '$1'
}).match('server/**.{es,js}', {
    parser: fis.plugin('typescript', {
        module: 1,
        target: 1,
        sourceMap: false
    })
}).match('**.{md,sh,log}', {
    release: false
}).match('package.json', {
    release: false
}).match('**.min.js', {
    optimizer: null
}).match('export.snippet.es', {
    isMod: false,
    release: false
}).match('layout.snippet.tpl', {
    isMod: false,
    release: false
});
fis.match('client/**.vue', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: [
        fis.plugin('vue-component', {
            // vue@2.x runtimeOnly
            runtimeOnly: true,          // vue@2.x 有runtimeOnly模式，为true时，template会在构建时转为render方法
            // styleNameJoin
            styleNameJoin: '',          // 样式文件命名连接符 `component-xx-a.css`
            extractCSS: true,           // 是否将css生成新的文件, 如果为false, 则会内联到js中
            // css scoped
            cssScopedIdPrefix: '_v-',   // hash前缀：_v-23j232jj
            cssScopedHashType: 'sum',   // hash生成模式，num：使用`hash-sum`, md5: 使用`fis.util.md5`
            cssScopedHashLength: 8,     // hash 长度，cssScopedHashType为md5时有效

            cssScopedFlag: '__vuec__',  // 兼容旧的ccs scoped模式而存在，此例子会将组件中所有的`__vuec__`替换为 `scoped id`，不需要设为空
        })
    ],
});
//页面代码
fis.match('client/**.vue:js', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true
});
fis.match('client/**.vue:less', {
    rExt: 'css',
    parser: [fis.plugin('less-2.x')],
    postprocessor: fis.plugin('autoprefixer')
});
fis.match('client/(**).vue', {
    useHash: true,
    release: 'static/vue/$1.js'
});
//通用组件
fis.match('client/widget/**.vue:less', {
    rExt: 'css',
    parser: [fis.plugin('less-2.x')],
    postprocessor: fis.plugin('autoprefixer'),
    packTo: '/${static}/comment/base.css'
});
fis.match('client/widget/**.vue:js', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    packTo: '/${static}/comment/base.js'
});

var port = 8082;

//  开发配置
fis.media('dev').match('*', {
    optimizer: null,
    useHash: false,
    deploy: fis.plugin('http-push', {
        receiver: 'http://127.0.0.1:' + port + '/yog/upload',
        to: '/'
    })
});
fis.match('client/static/favicon.ico', {
    packTo: '/${static}/favicon.ico',
    useHash: false,
});
fis.media('debug').match('*', {
    optimizer: null,
    useHash: false,
    deploy: fis.plugin('http-push', {
        receiver: 'http://127.0.0.1:' + port + '/yog/upload',
        to: '/'
    })
});
fis.media('debug-prod').match('*', {
    deploy: fis.plugin('http-push', {
        receiver: 'http://127.0.0.1:' + port + '/yog/upload',
        to: '/'
    })
});

fis.media('prod').match('client/widget/utils/**.js', {
    useHash: true,
    packTo: '/${static}/pkg/widget.js'
});