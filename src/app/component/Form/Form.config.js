/* eslint-disable max-len */
/* eslint-disable scandipwa-extensibility/file-structure */

/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

export const MIN_PASSWORD_LENGTH = 8;

export const validateEmail = ({ value }) => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
export const validateEmails = ({ value }) => value.split(',').every(email => validateEmail({ value: email.trim() }));
export const validatePassword = ({ value }) => value.match(/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)|(?=.*[a-z])(?=.*\d)(?=.*[\$\%\&])|(?=.*[A-Z])(?=.*\d)(?=.*[\$\%\&])|(?=.*[A-Z])(?=.*[a-z])(?=.*[\$\%\&])).{8,16}$/);
export const validateTelephone = ({ value }) => value.length > 0 && value.match(/^\+(?:[0-9-] ?){6,14}[0-9]$/);
export const isNotEmpty = ({ value }) => value.length > 0;
export const validatePasswordMatch = ({ value }, { password }) => {
    const { current: { value: passwordValue } } = password || { current: {} };
    return value === passwordValue;
};

export default {
    email: {
        validate: validateEmail,
        message: __('Email is invalid.')
    },
    emails: {
        validate: validateEmails,
        message: __('Email addresses are not valid')
    },
    password: {
        validate: validatePassword,
        message: __('Password should be at least 8 characters long')
    },
    telephone: {
        validate: validateTelephone,
        message: __('Phone number is invalid!')
    },
    notEmpty: {
        validate: isNotEmpty,
        message: __('This field is required!')
    },
    password_match: {
        validate: validatePasswordMatch,
        message: __('Password does not match.')
    }
};
