module.exports = {
    now: () => {
        Number.prototype.padLeft = function(base,chr){
            var  len = (String(base || 10).length - String(this).length)+1;
            return len > 0? new Array(len).join(chr || '0')+this : this;
        }
        d = new Date,
        dformat = [(d.getMonth()+1).padLeft(),
            d.getDate().padLeft(),
            d.getFullYear()].join('-') +' ' +
            [d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()].join('_');
        return d;
    }
}
