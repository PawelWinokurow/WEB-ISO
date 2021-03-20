import { Injectable } from "@angular/core";
//import Ajv, { JTDDataType } from "ajv/dist/jtd"

const userSchema = {
  properties: {
    username: { type: "string" },
    email: { type: "string" },
    role: { type: "string" },
    companyCode: { type: "string" },
    blocked: { type: "boolean" },
  },
  optionalProperties: {
    password: { type: "string" },
    passwordOld: { type: "string" }
  }
} as const;

//type UserSchema = JTDDataType<typeof userSchema>

@Injectable({
  providedIn: 'root'
})
export class JSONValidationService {

  constructor() { }

  async validateAccountWithoutPassword(model) {
    /*const ajv = new Ajv();
    const validate = ajv.compile<UserSchema>(userSchema)
    const result = await validate(model);
    if (!result) {
      const errors = await this.parseErrors(validate.errors);
      console.error(errors)
      throw errors;
    }
    return model;*/
  }

  async parseErrors(validationErrors) {
    let errors = [];
    validationErrors.forEach(error => {
      errors.push({
        param: error.params["missingProperty"],
        key: error.keyword,
        message: error.message,
        property: (function () {
          return error.keyword === 'minimum' ? error.dataPath : undefined
        })()
      });
    });

    return errors;
  }
}
