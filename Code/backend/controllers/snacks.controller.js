const Snacks = require('../models/snacks.model');

exports.getSnacks = (q) => {
    return Snacks.find({
        $or: [
            {brand_name: {'$regex': q + '.*', '$options': 'i'}},
            {product: {'$regex': q + '.*', '$options': 'i'}}
        ]
    });
}

exports.getSnackByID = (snack_id) => {
    return Snacks.findOne({_id: snack_id});
}
