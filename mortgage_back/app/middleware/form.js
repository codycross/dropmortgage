const Joi = require('joi');

let loanTypeValidation = Joi.string()
	.valid(['PURCHASE', 'REFINANCE', 'CASHOUT'])
	.label('Loan Type');

let propTypeCheck = Joi.string()
	.valid(['SINGLEFAMDET', 'SINGLEFAMATT', 'LOWRISECONDO', '2TO4UNITFAM', 'MOBILEPERMANENT'])
	.label('Property Type');

let propUseCheck = Joi.string()
	.valid(['OwnerOccupied', 'SecondHome', 'Investment'])
	.label('Property Use');

let docTypeCheck = Joi.string()
	.valid(['FullDoc', '12MonthsBankStatements', '24MonthsBankStatements', 'NoIncomeCashFlow'])
	.label('Document Type');

let formSchema = Joi.object()
	.keys({
		loanType: loanTypeValidation,
		downTotal: Joi.any().optional(),
		housing_history: Joi.string(),
		propType: propTypeCheck,
		propUse: propUseCheck,
		propLoc: Joi.any(),
		newHome: Joi.any(),
		ltv: Joi.number(),
		loanTotal: Joi.any().label('Loan Total'),
		foreign: Joi.any(),
		realAgent: Joi.any(),
		realOpt: Joi.any(),
		purchasePrice: Joi.number(),
		percentDown: Joi.any(),
		product: Joi.any(),
		creditRange: Joi.number(),
		docType: docTypeCheck,
		dob: Joi.any(),
		military: Joi.any(),
		bankruptcy: Joi.any(),
		bankruptcyInfo: Joi.any(),
		foreclosureInfo: Joi.any(),
		userAddress: Joi.object({
			street: Joi.any().optional(),
			zip: Joi.any().optional(),
			city: Joi.any().optional()
		}),
		name: Joi.string(),
		contact: Joi.object({
			phone: Joi.any(),
			email: Joi.any()
		})
	});

const formValidation = (req, res, next) => {
	let err = Joi.validate(req.body, formSchema);

	if (err && err.error) {
		res.status(400);
		res.send({
			message: err.error,
			action: "missingInfo"
		});
	}

	next()

}

module.exports = {
	formValidation,
	loanTypeValidation
};