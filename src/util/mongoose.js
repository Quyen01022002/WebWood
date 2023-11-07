

module.exports={
    mutipleMongooseToObject:function(mongooseArrays)
    {
        return mongooseArrays.map(mongooseArrays=>mongooseArrays.toObject())
    },
    mongooseToObject: function(mongose)
    {
        return mongose ? mongose.toObject(): mongose;
    }
}