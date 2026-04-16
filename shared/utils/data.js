export const PacketTypes = {
    /** Check if online/offline */
    PING: 0,

    /** Create a team */
    CREATE_TEAM: 10,

    /** Create a scouter within a team */
    CREATE_SCOUTER: 20,

    /** Check if login works */
    TEST_CREDENTIALS_TEAM: 30,

    /** Check if login works */
    TEST_CREDENTIALS_SCOUTER: 40,

    /** Get users for dropdown */
    GET_USERNAMES: 50,
}

/* Success is even. Failure is odd */
export const StatusCodes = {
    GENERIC_ERROR: 1,
    GENERIC_SUCCESS: 0,
    ACCOUNT_EXISTS: 11,
    ACCOUNT_CREATED: 20,
}