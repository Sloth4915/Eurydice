export class FormExpression {
    constructor(returns, name, description, params, calculate) {

    }

    static NUM = "num"
    static BOOL = "bool"
    static STR = "str"
    static TAGS = "tags"
    static FIELD = "field"
    static REPEAT_LAST = "repeat"
}

export const FormExpressions = {
    Transform: [
        new FormExpression(FormExpression.ANY, "if", "")
    ],
    Compare: {

    },
    Constants: {

    }
}