'use strict';
const _ = require('lodash');
const { default: axios } = require('axios');
const config = require('../../config');
const eventtoolConf = _.get(config, 'eventtool');
const Logger = require('../../utils/Logger');
const Joi = require('joi');
const { sendEmailSchema } = require('../../schemas');
const communicationBaseUrl = eventtoolConf.apiUrl + '/Communications';
const Eventtool = require('../../loaders/eventtool');

/**
 *
 * @typedef {Object} sendEmail
 * @property {Object} where
 * @property {Object} data
 * @property {Object} providerFields
 * @property {Object} [extras]
 */

/**
 * @param {sendEmail} sendEmailParams
 * @returns {Promise<import('axios').AxiosResponse>} sendEmailResponse
 */
const sendEmail = async (sendEmailParams) => {
    const { error } = sendEmailSchema.validate(sendEmailParams);
    if (error) {
        let { details = [] } = error;
        return Promise.reject({
            statusCode: 422,
            errors: details.map((i) => i.message),
        });
    }
    return axios.post(
        '/sendEmail',
        {
            baseURL: communicationBaseUrl,
            data: {
                ...sendEmailParams,
            },
        },
        {
            headers: {
                Authorization: Eventtool.accessToken,
            },
        }
    );
};
