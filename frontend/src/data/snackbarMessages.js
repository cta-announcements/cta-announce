const snackbarMessages = {
  submit: {
    error:
      'Uh oh 😕 There was an error submitting your announcement. Please try again later.',
    success: 'Great! Your announcement was submitted 😄',
    notSignedIn: 'You need to sign in to submit this form! 🧐'
  },
  admin: {
    alreadyAdmin: 'This user is already an admin 👍',
    userDoesNotExist: 'The user you searched for does not exist 😔',
    errorWhileSearching:
      'There was an error while searching for the user. Please try again 😅',
    errorWhileAdding: 'There was an error adding this user as an admin. Please try again 😅',
    errorWhileUnadding: 'There was an error unadding this admin. Please try again 😅',
    successUnadding: 'This user is no longer an admin 👌'
  },
  announcements: {
    deleteFailed: 'Couldn\'t delete this announcement. Please try again 😅',
    deleteSucceeded: 'Announcement deleted'
  }
}

export default snackbarMessages;