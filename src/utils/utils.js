import {SECRET_KEY} from "../store/constants";

/**
 * Password validator for login pages
 */
// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
    if (count < 2) return {label: 'Poor', color: '#f44336'};
    if (count < 3) return {label: 'Weak', color: '#ffc107'};
    if (count < 4) return {label: 'Normal', color: '#ffab91'};
    if (count < 5) return {label: 'Good', color: '#00e676'};
    if (count < 6) return {label: 'Strong', color: '#00c853'};
    return {label: 'Poor', color: '#f44336'};
};

// password strength indicator
export const strengthIndicator = (number) => {
    let strengths = 0;
    if (number.length > 5) strengths += 1;
    if (number.length > 7) strengths += 1;
    if (hasNumber(number)) strengths += 1;
    if (hasSpecial(number)) strengths += 1;
    if (hasMixed(number)) strengths += 1;
    return strengths;
};

export function formatMobile(mobile) {
    mobile = mobile?.toString();
    if (mobile?.length === 0) {
        mobile = "";
    } else if (mobile?.length <= 3) {
        mobile = mobile?.replace(/^(\d{0,3})/, "($1)");
    } else if (mobile?.length <= 6) {
        mobile = mobile?.replace(/^(\d{0,3})(\d{0,3})/, "($1) $2");
    } else if (mobile?.length === 9) {
        mobile = mobile?.replace(/^(\d{0,2})(\d{0,3})(\d{0,4})/, "($1) $2 $3");
    } else if (mobile?.length <= 10) {
        mobile = mobile?.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2 $3");
    } else if (mobile?.length === 11) {
        mobile = mobile?.replace(
            /^(\d{0,2})(\d{0,2})(\d{0,3})(\d{0,4})/,
            "+$1 ($2) $3 $4"
        );
    }

    return mobile;
}

export function currencyFormat(num, unit, fractionDigits) {
    return unit + num?.toFixed(fractionDigits).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function longTextShow(text, maxLength) {
    return ((text).length > maxLength) ?
        (((text).substring(0, maxLength - 3)) + '...') :
        text;
}

export function findStatus(status) {
    let statusName;
    let statusColor;

    if (status === 0) {
        statusName = "Initial";
        statusColor = "#795548";
    } else if (status === 1) {
        statusName = "Pending";
        statusColor = "#8ed1fc";
    } else if (status === 2) {
        statusName = "Active";
        statusColor = "#00D084";
    } else if (status === 3) {
        statusName = "Rejected";
        statusColor = "#fcb900";
    } else if (status === 4) {
        statusName = "Suspended";
        statusColor = "#f47373";
    } else {
        statusName = "Invalid";
        statusColor = "#abb8c3";
    }

    return {status: statusName, color: statusColor};
}

export function getTimeWelcome() {
    const hours = new Date().getHours();

    if (+hours < 12) {
        return "Good Morning!";
    } else if ((+hours > 12 && +hours < 16) || +hours === 12) {
        return "Good Afternoon!";
    } else {
        return "Good Evening!";
    }
}

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name) {
    if (name !== " ") {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    }
}

const CryptoJS = require("crypto-js");

export function encrypt(cipherText) {
    if (cipherText) {
        return CryptoJS.AES.encrypt(
            JSON.stringify(cipherText),
            SECRET_KEY
        ).toString();
    }
}

export function decrypt(cipherText) {
    if (cipherText) {
        let bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}
export const _setImage = async (src, filename) => {
    try {
        if (src) {
            return await fetch(src)
                .then((r) => r.blob())
                .then(
                    (blobFile) =>
                        new File([blobFile], filename, {type: blobFile.type})
                );
        } else {
            return {};
        }
    } catch (error) {
        console.log(error);
        return {};
    }
};

export function getSalaryRange(val){
    let range;
    switch (val) {
        case 0:
            range = 'Between Rs. 100,000 & Rs. 200,000';
            break;
        case 1:
            range = 'Between Rs. 200,000 & Rs. 300,000';
            break;
        case 2:
            range = 'Above Rs. 300,000';
            break;
        default:
            range = 'inavlid';
    }

    return range;
}

export function getIncomeType(val){
    let type;
    switch (val) {
        case 0:
            type = 'Salaried Employee';
            break;
        case 1:
            type = 'Other Income';
            break;
        default:
            type = 'inavlid';
    }

    return type;
}

export function getEmployeeType(val){
    let type;
    switch (val) {
        case 0:
            type = 'Permanent';
            break;
        case 1:
            type = 'Contract';
            break;
        case 2:
            type = 'Self Employed';
            break;
        default:
            type = 'inavlid';
    }

    return type;
}
