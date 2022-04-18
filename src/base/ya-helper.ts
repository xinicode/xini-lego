import * as dayjs from 'dayjs';
import _ from 'lodash';
import qs from 'qs'; //

let stringEmpty = '';

let toString = Object.prototype.toString;

let core_hasOwn = Object.prototype.hasOwnProperty;

let _tick = 0;

function _querystring(url) {
  let [newUrl, ...hash] = url ? url.split('#') : ['', ''];
  return [hash.join('#'), ...newUrl.split('?')];
}

export default class yaHelper {
  static stringEmpty = stringEmpty;

  static get dayjs() {
    return dayjs;
  }

  // 本地存储
  static get storage() {
    return '';
  }

  static get base64() {
    return '';
  }

  static isUndefined(obj) {
    return typeof obj === 'undefined' || obj == undefined;
  }

  static isNull(obj) {
    return obj === null || yaHelper.isUndefined(obj);
  }

  static isNullEmpty(s) {
    return yaHelper.isNull(s) || s === stringEmpty;
  }

  static trim(str, newline) {
    if (str) {
      return newline
        ? str.replace(/^(?:\s|\u3000|\ue4c6|\n|\r)*|(?:\s|\u3000|\ue4c6|\n|\r)*$/g, '')
        : str.replace(/^(?:\s|\u3000|\ue4c6)*|(?:\s|\u3000|\ue4c6)*$/g, '');
    } else {
      return '';
    }
  }

  static replaceAll(s, str, repl, flags) {
    if (yaHelper.isNullEmpty(s) || yaHelper.isNullEmpty(str)) return s;
    str = str.replace(/([^A-Za-z0-9 ])/g, '\\$1');
    s = s.replace(new RegExp(str, flags), repl);
    return s;
  }

  /**
   * 比较两个对像是否相等，但不比较function类型
   * @param {*} p1
   * @param {*} p2
   * @returns
   */
  static isEqualObject(p1, p2) {
    return _.isEqualWith(p1, p2, (item1, item2) => {
      if (_.isFunction(item1) && _.isFunction(item2)) {
        return true;
      }
    });
  }

  /**
   * 生成时间戳
   * @returns 随机数
   */
  static makeAutoId() {
    var t = new Date().valueOf();
    if (++_tick > 100000) _tick = 0;
    return [t, _tick].join('_');
  }
  /**
   * @param url
   * @param p
   * @param json 如果为true , 属性内容 Array 或 Object 转为JSON, 默认为 false
   * @param iseToHttp  是否用于http，encode会不一样 , 默认为 false
   *
   */
  static setQueryString(url, p, json, useToHttp?) {
    if (!p) return url;
    let [hash, href, queryStr] = _querystring(url || '');
    let query = yaHelper.queryParse(queryStr);
    yaHelper.eachProp(p, (item, name) => {
      item || (item = '');
      query[name] =
        json === true && (_.isArray(item) || _.isObject(item)) ? JSON.stringify(item) : item;
    });
    let queryStringify = yaHelper.queryStringify(query, useToHttp);
    let toUrl = !queryStringify ? href : [href, queryStringify].join('?');
    if (hash) toUrl = [toUrl, hash].join('#');
    return toUrl;
  }

  /**
   * 获取url query， 如果name为空返回query部分
   * @param url
   * @param name
   */
  static getQueryString(url, name) {
    if (!url) return '';
    let [hash, href, queryStr] = _querystring(url);
    if (!name) return queryStr || '';
    let query = yaHelper.queryParse(queryStr);
    return query[name] || '';
  }

  /**
   * url
   * @param p
   * @param json
   * @returns
   */
  static setHashQueryString(url, p, json) {
    if (!p) return url;
    let [hash, href, queryStr] = _querystring(url || '');
    hash = yaHelper.setQueryString(hash, p, json);
    let toUrl = !queryStr ? href : [href, queryStr].join('?');
    if (hash) toUrl = [toUrl, hash].join('#');
    return toUrl;
  }

  /**
   * 获取url hash query, 如果name为空返回query部分
   * @param  url
   * @param  name
   * @returns
   */
  static getHashQueryString(url, name) {
    if (!url) return '';
    url = yaHelper.getUrlHash(url);
    let [hash, href, queryStr] = _querystring(url);
    if (!name) return queryStr || '';
    let query = yaHelper.queryParse(queryStr);
    return query[name] || '';
  }

  /**
   * 获取url hash部分
   * @param  url
   * @returns
   */
  static getUrlHash(url) {
    let [hash, href, queryStr] = _querystring(url);
    let hash1 = _querystring(url);
    return _.trim(hash);
  }

  /**
   *
   * @param {*} query
   * @param {*} useToHttp
   * @returns
   */
  static queryStringify(query, useToHttp) {
    let str = (query && qs.stringify(query)) || '';
    return useToHttp === true ? str.replace(/\%2B|\%20/g, '+').replace(/\%2C/g, ',') : str;
  }

  static eachProp(obj, callback) {
    if (!obj) return;
    var item;
    for (var n in obj) {
      if (yaHelper.hasOwnProp(obj, n)) {
        item = obj[n];
        if (callback.call(null, item, n) === false) break;
      }
    }
  }

  static queryParse(query) {
    return (query && qs.parse(query)) || {};
  }

  /**
   * 检测对象key是否存在
   * @param {*} obj
   * @param {*} prop
   * @returns boolean
   */
  static hasOwnProp(obj, prop) {
    return core_hasOwn.call(obj, prop);
  }

  /**
   * 打印错误日志
   * @param {*} e
   */
  static trace(e) {
    console.error && console.error(e.stack || e.message || e + '');
  }

  static each(list, fn, thisArg = null) {
    if (!list) return;
    var len = list.length;
    for (let i = 0, len = list.length; i < len; i++) {
      if (fn.call(thisArg, list[i], i) === false) break;
    }
  }

  /**
   * 比较两个对像是否相等，但不比较function类型
   * @param p1
   * @param p2
   */
  static isEqualNotFn(p1, p2) {
    return _.isEqualWith(p1, p2, function (item1, item2) {
      if (_.isFunction(item1) && _.isFunction(item2)) return true;
    });
  }

  /**
   * 检查数组是否存在某元素
   * @param {*} list
   * @param {*} p
   * @param {*} thisArg
   * @returns
   */
  static inArray(list, p, thisArg = null) {
    let isF = _.isFunction(p);
    let index = -1;
    yaHelper.each(
      list,
      (item, idx) => {
        var ok = isF ? p.call(thisArg, item, idx) : item == p;
        if (ok) {
          index = idx;
          return false;
        }
      },
      thisArg
    );
    return index == -1 ? false : true;
  }

  /**
   * 拓展obj 返回obj
   * @param {*} obj
   * @param  {...any} args
   */
  static extend(obj, ...args) {
    if (obj) {
      yaHelper.each(args, function (p) {
        p &&
          yaHelper.eachProp(p, function (item, name) {
            obj[name] = item;
          });
      });
    }
  }
}
