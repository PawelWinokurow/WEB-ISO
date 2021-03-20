const Ajv = require("ajv").default

const userWithoutPasswordSchema = {
    type: 'object',
    additionalProperties: true,
    required: ['username', 'email', 'companyCode', 'role'],
    properties: {
        username: { type: "string" },
        email: { type: "string" },
        role: { type: "string" },
        companyCode: { type: "string" },
    },
};

async function validateAccountWithoutPassword(model) {
    const ajv = new Ajv({ allErrors: true, async: true });
    const validate = ajv.compile(userWithoutPasswordSchema);
    const result = await validate(model);
    if (!result) {
        const errors = await parseErrors(validate.errors);
        console.error(errors)
        throw errors;
    }
    return model; 
}

async function parseErrors(validationErrors) {
    let errors = [];
    validationErrors.forEach(error => {
      errors.push({
        param: error.params["missingProperty"],
        key: error.keyword,
        message: error.message,
        property: (function() {
          return error.keyword === 'minimum' ? error.dataPath : undefined
        })() 
      });
    });

    return errors;
  }

module.exports = {
    validateAccountWithoutPassword,
}