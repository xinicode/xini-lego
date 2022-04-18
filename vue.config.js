const path = require('path');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  // 默认'/'，部署应用包时的基本 URL
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './',

  // 打包后生成的生产环境构建文件的目录，dist是默认值。默认情况下每次打包都会清空上次打包文件（构建时传入 --no-clean 可关闭该行为）
  outputDir: process.env.outputDir || 'dist',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  indexPath: 'index.html',

  // 在保存后 eslint 检查代码。将值设置为'error'是把错误直接输出为编译错误。process.env.NODE_ENV !== 'production'，在生产环境上设为false
  lintOnSave: true,

  // 文件名hash
  filenameHashing: true,

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右
  runtimeCompiler: true,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],

  // 生产环境的 source map
  productionSourceMap: !IS_PROD,

  // 设置类型是Sring，设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响
  crossorigin: undefined,

  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性
  integrity: false,

  // 向 PWA 插件传递选项。
  pwa: {},

  chainWebpack: (config) => {
    // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改
    config.resolve.symlinks(true); // 修复热更新失效

    if (IS_PROD) {
      config
        .plugin('uglifyjs-plugin')
        .use('uglifyjs-webpack-plugin', [
          {
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'],
              },
            },
          },
        ])
        .end();
      // config.plugin('gzip-plugin')         //gizp压缩是一种http请求优化方式，通过减少文件体积来提高加载速度，可以减小60%以上的体积
      //   .use('compression-webpack-plugin', [{
      //     filename: '[path].[query]',
      //     algorithm: 'gzip',
      //     test: /\.js$|\.html$|\.json$|\.css$|\.ttf$/,
      //     threshold: 0, // 只有大小大于该值的资源会被处理
      //     minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      //     deleteOriginalAssets: false // 删除原文件
      //   }])
      //   .end()
      config.optimization.delete('splitChunks');
    }
  },

  // configureWebpack: config => {
  //   config.optimization = {
  //     splitChunks: {
  //       cacheGroups: {
  //         libs: {
  //           name: 'chunk-libs',
  //           test: /[\\/]node_modules[\\/]/,
  //           priority: 10,
  //           chunks: 'initial'
  //         },
  //         elementUI: {
  //           name: 'chunk-elementUI',
  //           priority: 20,
  //           test: /[\\/]node_modules[\\/]element-ui[\\/]/,
  //           chunks: 'all'
  //         }
  //       }
  //     }
  //   }
  // },
  devServer: {
    //配置proxy代理解决跨域问题
    compress: true, // 为所服务的一切启用gzip压缩
    host: 'localhost', // 指定要使用的主机。默认情况下这是localhost。
    port: 8080, // 端口号
    overlay: {
      //      让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true,
    },
    https: false, // 启用https https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    // hot: true, // 热模块替换，就是热更新页面
    hotOnly: true, // 热更新
    proxy: {
      '/api': {
        target: 'http://10.201.61.116',
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        ws: false, //是否支持websocket
        secure: false,
      },
    },
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [],
    },
  },
  css: {
    requireModuleExtension: true,
    extract: false,
    sourceMap: true,
    loaderOptions: {
      css: {},
      less: {},
    },
  },
};
