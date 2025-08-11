/**
 * @file config.qa.js
 * @author leon.wang(leon.wang@derbysoft.net)
 */

module.exports = {

    port: '8080',

    proxyTable: {
        '/book-engine-qa': 'http://api-gateway2-default.stone:9080'
    }

};
