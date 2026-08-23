export class FormExpression {
    /**
     * 
     * @param {Number} returns FormExpression Type for what value the expression will return 
     * @param {String} name
     * @param {String} description
     * @param {Array} params Array of parameters. Begin with false to hide expression name in UI. Parameters should be FormExpression Type. Include strings for UI helpers. If multiple types are allowed in a slot, create an array.
     * @param {Function} calculate Function with params passed in, already calculated. If function returns action, then calculate should return another function, otherwise return the value. Params passed in will not include ui helpers.
     */
    constructor(returns, name, description, params, calculate) {
        this.returns = returns
        this.name = name
        this.description = description
        this.showTitle = params.length > 0 ? (params[0] === false ? params.shift() : true) : true // Changes based on params if false is first in array
        this.visualParams = [] // [0, 1, "+"] etc where numbers are this.params index and strings are ui helpers
        this.params = []
        let i = 0
        for (let p of params) {
            if (typeof p === "string") this.visualParams.push(p)
            else {
                this.visualParams.push(i)
                this.params.push(p)
                i++
            }
        }
        this.calculate = calculate
    }

    static NUM = 0
    static BOOL = 1
    static STR = 2
    static TAGS = 3
    static FIELD = 4
    static ACTION = 5
    static REPEAT_NEXT = 6

    /** It will allow the parameters of the parent */
    static ALLOWED_PARAMS = 7

    /** Exists for things like "if" that can return whatever is required. Always allowed as a parameter. */
    static ALLOW_AS_PARAM_ALWAYS = 8
}

export class FormExpressionValue extends FormExpression {
    constructor(type, value) {
        let name
        switch (type) {
            case FormExpression.NUM: name = "#"; break;
            case FormExpression.BOOL: name = "Num"; break;
            case FormExpression.STR: name = "Str"; break;
            case FormExpression.TAGS: name = "Tags"; break;
            case FormExpression.ACTION: name = ""; break;
        }
        super(type, name, "", [], () => {})
        this.constant = true
        this.value = value

        let self = this
        this.calculate = function() {
            return self.value
        }
    }
}

export const FormExpressions = {
    Transform: [
        new FormExpression(FormExpression.ALLOW_AS_PARAM_ALWAYS, "If", "", [FormExpression.BOOL, "true:", FormExpression.ALLOWED_PARAMS, "false:", FormExpression.ALLOWED_PARAMS], function(params) {
            if (params[0]) return params[1]
            return params[2]
        }),
        new FormExpression(FormExpression.NUM, "Add", "", [false, FormExpression.NUM, FormExpression.REPEAT_NEXT, "+", FormExpression.NUM], function(params) {}),
        new FormExpression(FormExpression.STR, "String Concatenate", "", [false, "String", [FormExpression.NUM, FormExpression.STR], FormExpression.REPEAT_NEXT, "+", [FormExpression.NUM, FormExpression.STR]], function(params) {}),
        new FormExpression(FormExpression.NUM, "Subtract", "", [false, FormExpression.NUM, FormExpression.REPEAT_NEXT, "-", FormExpression.NUM], function(params) {}),
        new FormExpression(FormExpression.NUM, "Multiply", "", [false, FormExpression.NUM, FormExpression.REPEAT_NEXT, "*", FormExpression.NUM], function(params) {}),
        new FormExpression(FormExpression.NUM, "Divide", "", [false, FormExpression.NUM, FormExpression.REPEAT_NEXT, "*", FormExpression.NUM], function(params) {}),
        new FormExpression(FormExpression.NUM, "Mean", "", [FormExpression.NUM, FormExpression.REPEAT_NEXT, FormExpression.NUM], function(params) {}),
        new FormExpression(FormExpression.NUM, "Median", "", [FormExpression.NUM, FormExpression.REPEAT_NEXT, FormExpression.NUM], function(params) {}),
        new FormExpression(FormExpression.NUM, "Power", "", [false, FormExpression.NUM, "^", FormExpression.NUM], function(params) {}),
    ],
    Compare: [

    ],
    Constants: [

    ],
    Actions: [
        new FormExpression(FormExpression.ACTION, "None", "Does nothing", [], function(params) { return function() {} })
    ]
}
