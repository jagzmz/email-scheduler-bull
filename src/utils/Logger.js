'use strict';

const _ = require('lodash');
const moment = require('moment');

class Logger extends console.Console {
    constructor(debug, _loggers = {}) {
        super(process.stdout, process.stderr);

        this._debugEnabled = debug;
        this.log = this._wrapper(this.log, 'LOG');
        this.info = this._wrapper(this.info, 'INFO');
        this.error = this._wrapper(this.error, 'ERR');
        this.warn = this._wrapper(this.warn, 'WARN');
        this.debug = this._debugEnabled
            ? this._wrapper(this.debug, 'DEBUG')
            : undefined;
        this._loggers = _loggers;
    }

    _wrapper(method, tag) {
        return (...args) => {
            const stamp = `${Logger.timestamp} [${tag}]`;
            for (const logFn in this._loggers) {
                if (!_.isFunction(this._loggers[logFn])) {
                    return;
                }
                this._loggers[logFn](stamp, ...args);
            }
            return method(stamp, ...args);
        };
    }

    static get timestamp() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }
}

module.exports = new Logger(true);
