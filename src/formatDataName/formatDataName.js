const patterThe = /de+l?/;
const patterWhiteSpaces = /\s+/;
let correctName;
const whiteSpace = ' ';

export const capitalizedFormat = (name) => {
    correctName = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    return correctName;
};

export const formatString = (name) => {
    const discomposeName = name.trim().split(patterWhiteSpaces);
    if (name.includes('(')) {
        discomposeName.unshift(discomposeName.pop());
    }
    const formatItems = discomposeName.map((stringItems) => {
        switch (patterThe.test(stringItems)) {
            case true:
                return stringItems;
            case false:
                if (stringItems.includes('-')) {
                    const newSplit = stringItems.split('-');
                    const formatCapitalized = newSplit.map((items) =>
                        capitalizedFormat(items),
                    );
                    return (stringItems = formatCapitalized.join('-'));
                } else if (stringItems.includes('(')) {
                    const a = stringItems.indexOf('(');
                    const b = stringItems.indexOf(')');
                    stringItems = stringItems.slice(a + 1, b);
                    return (stringItems = capitalizedFormat(stringItems));
                }

                return (stringItems = capitalizedFormat(stringItems));
        }
    });
    return formatItems.join(whiteSpace);
};
