class middlewareBean{
    constructor(fn, index) {
        this.fn = fn;
        this.index = index;
    }

    setIndex(index){
        this.index = index
    }

}


module.exports = middlewareBean
