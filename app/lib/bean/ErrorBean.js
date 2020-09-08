class ErrorBean extends Error{
    constructor(name, status, msg) {
        super();
        this.status = status;
        this.msg = msg;
        this.name = name;
    }
}

module.exports = ErrorBean
