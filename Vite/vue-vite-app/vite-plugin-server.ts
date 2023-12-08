import { Plugin } from "vite";
import httpProxy from "http-proxy";
import fs from "fs";

export default function ServerPlugin() {
    return {
        name: 'vite-plugin-server',
        configureServer(server) {
            const proxyServer = httpProxy.createProxyServer({
                changeOrigin: true,
                autoRewrite: true,
            });
            server.middlewares.use(async (request, response, next) => {
                const resultHtmlStr: string = await new Promise((resolve, reject) => {
                    proxyServer.web(request, response, { target: "https://ai.alimebot.taobao.com" });
                    proxyServer.on('proxyReq', function (proxyReq, req, res, options) {
                        proxyReq.setHeader('Accept-encoding', "identity");
                        console.log(proxyReq.path, '=');
                    });
                    proxyServer.on('proxyRes', function (proxyRes, req, res) {
                        let bodyArr = [];
                        proxyRes.on('data', function (chunk) {
                            bodyArr.push(chunk)
                        });
                        proxyRes.on('end', function () {
                            const bodyString = Buffer.concat(bodyArr).toString();
                            resolve(bodyString);
                        });
                    });
                });
                // fs.writeFileSync("test.html", resultHtmlStr);
                console.log(resultHtmlStr);
                response.end(resultHtmlStr);
            })
        },
    } as Plugin
}