var model = require('./model.js');

var controller = {
    build : build,
	// buildTest: buildTest,
    // validateForm: validateForm
};

module.exports = controller;

function build(req,res){
    var data = req.body;
    
    return model.build(data)
    .then(function(report){
         return res.status(200).send(report);
    })
    .catch(function(err){
        if (err) return res.status(500).send(err);
    })
}