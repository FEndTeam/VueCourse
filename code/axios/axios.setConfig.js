// "axios.setConfig.js"文件

/**
 * @param {axios} axios实例
 * @param {config} 自定义配置对象，可覆盖掉默认的自定义配置
 */
export default (axios, config = {}) => {

    const defaultConfig = {
        baseURL: process.env.VUE_APP_BASEURL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'custom-defined-header-key': 'custom-defined-header-value',
            // 自定义请求头：对所有请求方法生效
            common: {
              'common-defined-key-b': 'custom value: for all methods'
            },
            // 自定义请求头：只对post方法生效
            post: {
              'post-custom-key': 'custom value: only for post method'
            },
            // 自定义请求头：只对get方法生效
            get: {
              'get-custom-key': 'custom value: only for get method'
            }
        }
    }

    Object.assign(axios.defaults, defaultConfig, config)
    return axios
}
