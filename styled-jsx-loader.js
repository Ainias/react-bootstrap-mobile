const loaderUtils = require('loader-utils');

const types = ['scoped', 'global', 'resolve'];

module.exports = function (content, map, meta) {
    if (this.cacheable) this.cacheable();
    this.addDependency(this.resourcePath);
    const options = Object.assign({}, loaderUtils.getOptions(this));

    if (!options.classesExportName) {
        options.classesExportName = 'classes';
    }

    let output = `import content, * as namedExport from "!!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!${this.resourcePath}";\n
    import css from 'styled-jsx/css';\nconst styles = css\`\${content.toString()}\`;\n`;

    output += 'const classNames = content.locals ? content.locals : {};\n';
    output += '\n\nexport default {...classNames, toString: () => styles};\n\n';

    output += `export {styles as css}`;

    this.callback(null, output);
};
