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
        this.paramTypes = []
        let i = 0
        for (let p of params) {
            if (typeof p === "string") this.visualParams.push(p)
            else {
                this.visualParams.push(i)
                this.paramTypes.push(p)
                this.params.push(FormExpression.getNull())
                i++
            }
        }
        this.calculate = calculate
        this.expressionVersion = 1 // For backwards compatibility purposes if there are breaking changes in the future.
    }

    static NUM = 10
    static BOOL = 20
    static STR = 30
    static TAGS = 40
    static FIELD = 50
    static ACTION = 60
    static REPEAT_NEXT = 70

    /** It will allow the parameters of the parent. Can be both a param type and return type */
    static ALLOWED_PARAMS = 80

    /** Exists for things like "if" that can return whatever is required. Always allowed as a parameter. */
    static ALLOW_AS_PARAM_ALWAYS = 90

    static getNoneAction = () => { return new FormExpression(FormExpression.ACTION, "None", "Does nothing", [], function(params) { return function() {} }) }
    static getNull = () => { return new FormExpression(FormExpression.ALLOW_AS_PARAM_ALWAYS, "", "", [], function(params) { return function() {} }) }

}

export class FormExpressionValue extends FormExpression {
    constructor(type, value) {
        let name
        switch (type) {
            case FormExpression.NUM: name = "NumValue"; break;
            case FormExpression.BOOL: name = "BoolValue"; break;
            case FormExpression.STR: name = "StrValue"; break;
            case FormExpression.TAGS: name = "TagsValue"; break;
        }
        super(type, name, "", [false], () => {})
        this.constant = true
        this.value = value

        let self = this
        this.calculate = function() {
            return self.value
        }
    }
}

export const getFormExpressions = () => { 
    return {
        Transform: [
            new FormExpression(FormExpression.ALLOW_AS_PARAM_ALWAYS, "If", "", [FormExpression.BOOL, "true:", FormExpression.ALLOWED_PARAMS, "false:", FormExpression.ALLOWED_PARAMS], function(params) {
                if (params[0]) return params[1]
                return params[2]
            }),
            new FormExpression(FormExpression.NUM, "Add", "", [false, FormExpression.NUM, FormExpression.REPEAT_NEXT, "+", FormExpression.NUM], function(params) {}),
            new FormExpression(FormExpression.STR, "String Concatenate", "", [false, "StrConcat", [FormExpression.NUM, FormExpression.STR], FormExpression.REPEAT_NEXT, "+", [FormExpression.NUM, FormExpression.STR]], function(params) {}),
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
            FormExpression.getNoneAction()
        ]
    }
}
