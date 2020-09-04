const xml = require('xml2js');
const fs = require('fs');

class ParseFn {
    constructor(orm, sql) {
        this.orm = orm;
        this.sql = sql;
    }

    query(opts){
        let options = {
            type: 'SELECT',
            replacements: opts
        }
        return this.orm.query(this.sql, options);
    }
}

class Method {
    constructor(name, sql) {
        this.name = name;
        this.sql = sql;
    }
}

class QueryDao {
    constructor(orm, data, opts) {
        this.orm = orm;
        this.opts = opts || {};
        this.data = data;
        this.methods = [];
    }

    async init(){

        await xml.parseStringPromise(this.data, {
            trim: true,
            attrkey: 'attr',
            charkey: 'sql'
        }).then(res =>{
            res['mapper'].select.forEach(item =>{
                let method = new Method(item['attr']['id'], item['sql']);
                this.methods.push(method);
            })

        })
    }

    get() {
        let res = {}
        this.methods.forEach(method => {
            res[method.name] = new ParseFn(this.orm, method.sql);
        })
        return res;
    }

    parseIf() {

    }

    parseWhere() {

    }

    parseForeach() {


    }



}

module.exports = QueryDao
