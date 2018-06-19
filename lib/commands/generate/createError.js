"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropheticErrorTextDef = "class PropheticError extends ApolloError {\n  constructor(name: string, message: string, code?: string, properties?: Record<string, any>) {\n    super(message, code, properties);\n\n    // Set the prototype explicitly.\n    // https://stackoverflow.com/a/41102306\n    Object.setPrototypeOf(this, SyntaxError.prototype);\n    Object.defineProperty(this, 'name', { value: name });\n  }\n}";
function default_1(name, message, code, properties) {
    return "\n  export class " + name + " extends PropheticError {\n    constructor(properties?: Record<string, any>) {\n      super(\"" + name + "\", \"" + message + "\", " + code + ", properties);\n    }\n  }\n  ";
}
exports.default = default_1;
//# sourceMappingURL=createError.js.map