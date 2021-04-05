'use strict';

const { default: axios } = require('axios');
const config = require('../config');

const Logger = require('../utils/Logger');
const _ = require('lodash');

const eventtoolConf = _.get(config, 'eventtool');

const usersEp = eventtoolConf.apiUrl + '/users';

class Eventtool {
    /**
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    async getAuthorizationHeader() {
        try {
            const response = await axios.post(
                '/login',
                {
                    ...eventtoolConf.creds,
                },
                {
                    baseURL: usersEp,
                }
            );
            Logger.info(`Auth response: ${JSON.stringify(response.data)}`);
            return response.id;
        } catch (error) {
            error;
        }
    }

    async init() {
        this.accessToken = await this.getAuthorizationHeader();
    }

    // TODO: Renew token on expiry
}

module.exports = new Eventtool();
