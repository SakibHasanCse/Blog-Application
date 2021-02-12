'use strict';
/**
 * get unique error fields
 */

exports.errorHandler = (error) => {

    let message = ''


    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = UniqueMessage(error)
                break;
            default:
                message = 'Somthing went wrong'
        }
    } else {
        for (let errorName in error.errors) {
            if (error.errors[errorName].message) message = error.errors[errorName].message

        }
    }

    return message
}

function UniqueMessage(error) {

    let output;

    try {
        let fieldname = error.message.substring(error.message.lastIndexOf('.$') + 2, error, message.lastIndexOf('_1'))
        output = fieldname.charAt(0).toUpperCase() + fieldname.slice(1) + 'already exists'

    } catch (error) {

        output = 'Unique fields already exists'

    }
    return output

}