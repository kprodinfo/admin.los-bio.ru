export function checkNumber(val) {
    const n = parseFloat(val)
    return isNaN(n) ? val : n
}

export function setErrors(errors, target) {
    errors.forEach(error => {
        target.value[error.property] = error.error;
    })
}

export function toggleRefBooleanAsTimeout(param, start, end, ms) {
    param.value = start;
    setTimeout(() => {
        param.value = end;
    }, ms)
}

export function generateSlug(word) {
    if (typeof word !== "string") {
        return word;
    }

    const $word = word.toLowerCase();
    let answer = '';
    const converter = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
        'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya', ' ': '-', '/': "-", "³": "3"
    };

    for (let i = 0; i < $word.length; ++i) {
        if (converter[$word[i]] === undefined) {
            answer += $word[i];
        } else {
            answer += converter[$word[i]];
        }
    }

    return answer;
}

export function get(object, path, defaultValue) {
    if (typeof path === 'string') {
        path = path.split('.').map(key => {
            const numKey = Number(key)
            return isNaN(numKey) ? key : numKey
        })
    }

    let result = object

    for (const key of path) {
        if (result === undefined || result === null) {
            return defaultValue
        }

        result = result[key]
    }

    return result !== undefined ? result : defaultValue
}

export function getFile(file) {
    const runtimeConfig = useRuntimeConfig();
    return `${runtimeConfig.public.FILES_URL}/files/${file.catalog}/${file.name}`;
}
