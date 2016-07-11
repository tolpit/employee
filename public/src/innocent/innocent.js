//Innocent parser
const test       = new RegExp('\\${([a-zA-Z0-9_\.\(\)\+\-]+)}', 'g');
const testInsert = new RegExp('#block\\s(.*)\\n?', 'mi');
const testBlock  = new RegExp('#block\\s(.*)\\n?([\\w\\n\\S\\s]*)#endblock', 'mi');
const testIf     = new RegExp('#if\\s(.*)\\n?([\\w\\n\\S\\s]*)#endif', 'mi');
const testFor    = new RegExp('#for\\s([a-z]+)\\s(in|of)\\s([a-z]+)\\n?([\\w\\n\\S\\s]*)#endfor', 'mi');

var innocent = function innocent(layout, template, context) {
    return innocent.step(innocent.sanitize(innocent.prepare(layout, template)), context);
};

innocent.prepare = function prepare(layout, template) {
    let layoutInsert    = testInsert.exec(layout);
    let templateBlock   = testBlock.exec(template);

    let [layoutOrigin, layoutName] = layoutInsert;
    let [templateOrigin, blockName, content] = templateBlock;

    if(layoutName == blockName) {
        return layout.replace(layoutOrigin, content);
    }
    else {
        return layout.replace(layoutOrigin, "");
    }
};

innocent.step = function global(text, context) {
    let matchs = text.match(test) || [];

    matchs
        .map((key) => key.replace('${', '').replace('}', '').trim())
        .filter((key) => context.hasOwnProperty(key))
        .forEach((key) => {
            text = text.replace('${' + key + '}', context[key] || '');
        });

    text = innocent.if(text, context);
    text = innocent.for(text, context);

    return text;
};

innocent.if = function(text, context) {
    let cond = testIf.exec(text);

    if(!cond) return text;

    let [original, condition, content] = cond;

    if(condition == condition.trim() && !context.hasOwnProperty(condition)) return text.replace(original, '');
    else return text.replace(original, content);
};

innocent.for = function(text, context) {
    let loop = testFor.exec(text);

    if(!loop) return text;
    else if(loop && loop.length < 5) return text.replace(loop[0], '');

    let [original, item, comparator, array, content] = loop;

    //no data
    if(!context.hasOwnProperty(array)) return text.replace(original, '');

    //populate the template with the data
    let forText = context[array].map((item) => {
        return innocent.step(content, item instanceof Object ? item : { item });
    }).join("\n");

    return text.replace(original, forText);
};

innocent.body = function body(text) {
    return text.replace(/<html[\w\S\t\n\s]+<body>/, '').replace(/<\/body>\n?<\/html>/, '');
};

innocent.sanitize = function sanitize(text) {
    return text.split(/\n/).map(line => line.trim()).filter(line => line != '').join("\n");
};

self.innocent = innocent;

export default innocent;