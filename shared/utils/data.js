export const PacketTypes = {
    /** Check if online/offline */
    PING: 0,

    CREATE_ORGANIZATION: 1,
    LOGIN_ORGANIZATION: 2,
    LOGOUT_ORGANIZATION: 3,

    RESET_JOIN_CODE: 4,

    TBA_REQUEST: 5
}

export const StatusCodes = {
    SUCCESS: 0,
    GENERIC_ERROR: 1,
    EXISTS_ERROR: 2,
    PASSWORD_DOESNT_MATCH: 3,
    MISSING_FIELDS: 4,
    BAD_CREDENTIALS: 5,
}

export function getError(error) {
    switch (error) {
        case StatusCodes.SUCCESS: return "Success"
        case StatusCodes.GENERIC_ERROR: return "Something went wrong. Please try again later"
        case StatusCodes.EXISTS_ERROR: return "This already exists."
        case StatusCodes.PASSWORD_DOESNT_MATCH: return "Passwords do not match."
        case StatusCodes.MISSING_FIELDS: return "One or more fields are missing or blank."
        case StatusCodes.BAD_CREDENTIALS: return "Invalid credentials."

        default: return "An unknown error occured"
    }
}

/** Login length in milliseconds. This is 3 days. */
export const LOGIN_LENGTH = 1000*60*60*24*3
