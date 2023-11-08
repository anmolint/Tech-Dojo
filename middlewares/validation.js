function requestValidator(schema) {
	return async (request, _response, next) => {
		try {
			if (schema.pathParamsSchema) {
				await schema.pathParamsSchema.validateAsync(request.params);
			}

			if (schema.queryParamsSchema) {
				await schema.queryParamsSchema.validateAsync(request.query);
			}

			if (schema.bodySchema) {
				await schema.bodySchema.validateAsync(request.body);
			}

			next();
		} catch (e) {
			next(e);
		}
	};
}

module.exports = requestValidator;
