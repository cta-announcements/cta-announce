
// the hour, past which, same day submission is no longer allowed
const cutoffHour = 9;

// max runtime for an announcement, caluclated as submissionDate - currentDate
const maxRuntimeInDays = 10;

const expiryConstants = {
    cutoffHour,
    maxRuntimeInDays
}

export default expiryConstants;