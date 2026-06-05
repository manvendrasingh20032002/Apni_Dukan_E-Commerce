import PasswordValidator from "password-validator"

var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have at least 1 uppercase letter
    .has().lowercase(1)                             // Must have at least 1 lowercase letter
    .has().digits(1)                                // Must have at least 1 digit
    .has().symbols(1)                               // Must have at least 1 special character
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Admin@123']); // Blacklist these values
export default function FormValidators(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "username":
        case "icon":
        case "pin":
        case "city":
        case "address":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value.length > 200)
                return name + " Field Length Must Be 3-200 Characters"
            else
                return ""


        case "state":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 2 || value.length > 200)
                return name + " Field Length Must Be 2-200 Characters"
            else
                return ""

        case "email":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 13 || value.length > 200)
                return name + " Field Length Must Be 13-200 Characters"
            else
                return ""

        case "password":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (!(schema.validate(value)))
                return (schema.validate(value, { details: true })).map(x => x.message).join()
            else
                return ""

        case "phone":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 10 || value.length > 10)
                return name + " Field Length Must Be 10 Digits"
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9")))
                return name + " Field Must Start With 6,7,8 or 9"
            else
                return ""

        case "shortDescription":
        case "answer":
        case "message":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 50)
                return name + " Field Length Must Be Upto 50 Characters"
            else
                return ""

        case "question":
        case "subject":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 10)
                return name + " Field Length Must Be Upto 10 Characters"
            else
                return ""
        default:
            return ""
    }
}
