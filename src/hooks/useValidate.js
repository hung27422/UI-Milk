const Joi = require("joi");
const phoneRegux = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
function useValidate() {
  const guestSchema = Joi.object({
    nameGuest: Joi.string().required(),
    phoneGuest: Joi.string()
      .pattern(phoneRegux, { name: "Vui lòng nhập đúng 10 số" })
      ?.required(),
    emailGuest: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    addressGuest: Joi.string().min(11).required(),
  });

  return { guestSchema };
}

export default useValidate;
