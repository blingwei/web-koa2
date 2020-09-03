
'use strict';
/*jslint node:true*/
//from koa

const config = require('./config');


const http = require('http');
const Koa = require('koa');
const logger = require('koa-logger');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const csrf= require('koa-csrf');
const cors = require('koa2-cors');
const statics = require('koa-static');
const Router =require('koa-router');
const io = require('socket.io');


//from fs
const fsDc = require('./utils/dc');
const fsLogger = require('./utils/logger');


const app = new Koa();
const router = new Router();

// init koa-session
app.keys = ["it is a secret"];

app.use(session(config.session, app));

// init cors 设置跨域
app.use(cors({
    credentials: true
}));

//init fs.logger and inject it into app(app.fs.logger) and runtime ctx(ctx.fs.logger)
app.use(fsLogger(app, config.logger));

// 全局错误处理
app.use(errorHandler());
// if(config.staticDirs && Array.isArray(config.staticDirs)){
//     config.staticDirs.forEach(function(s){
//         app.use(convert(statics(s)));
//     });
// }

// init koa-logger
app.use(logger());

app.use(bodyParser({
    enableTypes:['json', 'form', 'text']
}))
// app.use(new csrf({
//     invalidTokenMessage: 'Invalid CSRF token',
//     invalidTokenStatusCode: 403,
//     excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
//     disableQuery: true
// }));


//init fs.dc and inject it into app(app.fs.dc) and runtime ctx(app.fs.dc)
if(config.dc){
    app.use(fsDc(app, config.dc));
}

const server = http.createServer(app.callback());
const socket = io(server);

app.socket = socket;

//init mws （自定义配置）
config.mws.forEach(function (mv) {
    if (typeof mv.entry === 'function') {
        try {
            mv.entry(app, router, mv.opts);
        } catch (err) {
            app.fs.logger.log('error', '[app]', err)
        }
    }
});
// init router
app.use(router.routes()).use(router.allowedMethods());

function errorHandler() {
    return async function  (ctx, next) {
        try {
            await next();
        } catch (err) {
            ctx.fs.logger.error(err)
            //simple process.
            ctx.status = 500;
            ctx.body = err.message;
        }
    };
}

let port = config.port || 4000

app.server = server.listen(port, () => {
    console.log(`server is start at  http://localhost:${port}`);
});

app.router = router;








