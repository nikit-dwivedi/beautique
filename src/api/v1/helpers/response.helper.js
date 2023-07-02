import mongoose from 'mongoose';

//send success response --------------------------------------------------------
export async function success(res, message, items) {
    sendResponse(res, 200, true, message, "", items);
};

//send created response --------------------------------------------------------
export async function created(res, message, items) {
    sendResponse(res, 201, true, message, '', items);
};

//send not found response ------------------------------------------------------
export async function notFound(res, message) {
    sendResponse(res, 404, false, message, '', {});
};

//send bad request response ----------------------------------------------------
export async function badRequest(res, message, error) {
    sendResponse(res, 400, false, message, error, undefined);
};

//send unauthorized request response -------------------------------------------
export async function unauthorized(res, message) {
    sendResponse(res, 401, false, message, '', {});
};

//send forbidden request response ----------------------------------------------
export async function forbidden(res, message) {
    sendResponse(res, 403, false, message, '', {});
};

//send validation error response -----------------------------------------------
export async function serverValidation(res, error) {
    let responseErrors = {};
    const errors = error.errors;
    errors.forEach(error => {
        const [key, value] = [error.param.toUpperCase().replace('.', '-'), error.msg.toUpperCase().replace('.', '-')]
        responseErrors[key] = value.toUpperCase();
    });
    sendResponse(res, 400, false, 'Server Validation Errors', 'ValidationError', responseErrors);
}
//send error response ----------------------------------------------------------
export async function unknownError(res, error) {
    if (error instanceof mongoose.Error) {
        if (error.name == "ValidationError") {
            const errormessage = await this.validation(error.message);
            sendResponse(res, 400, false, 'All Fields Required', 'ValidationError', errormessage);
        } else if (error.name == "CastError") {
            sendResponse(res, 400, false, 'Invalid Data', 'CastError', { "data": `Need ${error.kind} but getting ${error.valueType}` });
        } else {
            console.log(error);
            sendResponse(res, 400, false, 'Something Went Wrong', error.message);
        }
    } else if (error.name === "MongoError" && error.code === 11000) {
        const errormessage = await this.alreadyExist(error.keyValue)
        sendResponse(res, 400, false, 'Unique Data Required', 'UniqueDataRequired', errormessage);
    } else {
        sendResponse(res, 500, false, 'Something Went Wrong', 'Unknown', error.message);
    }
};

//===================================================================================================
export async function validation(e) {
    const errors = {};
    const allErrors = e.substring(e.indexOf(':') + 1).trim()
    const AllErrorArrayFormate = allErrors.split(',').map(err => err.trim());
    AllErrorArrayFormate.forEach(error => {
        const [key, value] = error.split(':').map(err => err.trim());
        errors[key.toUpperCase().replace('.', '-')] = value.toUpperCase().replace('.', '-');
    })
    return errors;
};

export async function alreadyExist(e) {
    const errors = {};
    const keys = Object.keys(e);
    keys.forEach(error => {
        const [key, value] = [error.toUpperCase().replace('.', '-'), error.toUpperCase().replace('.', '-') + ' Already Exist']
        errors[key] = value.toUpperCase();
    })
    return errors;
};
//====================================================================================================
export async function onError(res, message, error) {
    sendResponse(res, 400, false, message, error, null);
    // res.status(400);
    // res.json({
    //     status: false,
    //     message: message,
    //     error: '',
    //     items: {}
    // });
};


export async function sendResponse(res, statusCode, status, message, error, items) {
    res.status(200);
    res.json({
        status: status,
        subCode: statusCode,
        message: message,
        error: error,
        items: items
    });
}



export async function invalid(res, message, items) {
    sendResponse(res, 301, false, message, '', items);
};
//====================================================================================================

