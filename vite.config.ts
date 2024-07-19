import {ConfigEnv, loadEnv, UserConfigExport} from 'vite';
import {resolve} from "path"
import * as process from "process";
import vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite"
import svgLoader from "vite-svg-loader"
import * as path from "path";

// https://vitejs.dev/config/
export default ({mode}: ConfigEnv): UserConfigExport => {
    const viteEnv = loadEnv(mode, process.cwd()) as ImportMetaEnv
    const {VITE_PUBLIC_PATH} = viteEnv
    return {
        base: VITE_PUBLIC_PATH,
        resolve: {
            alias: {
                "@": resolve(__dirname, "./src")
            }
        },
        server: {
            // 设置 host 才可以使用 Network 形式， 以 IP 访问项目
            host: true,
            // 端口号
            port: 3333,
            //是否自动打开浏览器
            open: true,
            //跨域设置
            cors: true,
            // 端口被占用时，强制退出
            strictPort: true,
            //代理设置
            proxy: {
                "/api/v1": {
                    target: "",
                    ws: true,
                    //是否允许跨域
                    changeOrigin: true
                }
            },
            //y预热常用文件，提高初始页面加载速度
            warmup: {
                clientFiles: ["./src/layouts/**/*.vue"]
            }
        },
        build: {
            //单个 chunk 文件大小超过 2048KB 发出警告
            chunkSizeWarningLimit: 2048,
            //禁止 gzip 压缩大小报告
            reportCompressedSize: false,
            //打包后静态资源目录
            assetsDir: "static",
            rollupOptions: {
                output: {
                    /**
                     * 分块策略
                     * 1. 注意这些包名必须存在
                     * 2. 如果你不想自定义 chunk 分割策略，可以直接移除
                     */
                    manualChunks: {
                        vue: ["vue","vue-router","pinia"],
                        element: ["element-puls", "@element-plus/icons-vue"]
                    }
                }
            }
        },
        // 混淆器
        esbuild: mode === "development" ? undefined : {
            //打包移除所有 console.log
            pure: ["console.log"],
            //打包移除所有 debugger
            drop: ["debugger"],
            //打包移除所有注释
            legalComments: "none"
        },
        // vite插件
        plugins:[
            vue(),
            VueJsx(),
            // 将 SVG 静态图 转化为 vue 组件
            svgLoader({defaultImport:'url'}),
            // SVG
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
                symbolId: "icon-[dir]-[name]"
            }),
            UnoCSS()
        ]
    }
}
