const dialogMessages = {
  submit: {
    normal: {
      text: 'In order to prevent spam, an admin will need to approve your announcement. This typically takes one day.',
      title: 'Give us some time 😅'
    },
    admin: {
      text:
        'You\'re an Admin, so your announcement will be automatically approved.',
      title: 'All set 😄'
    },
    beforeCutoff: {
      text: 'Good work, early bird! Your announcement will be approved by 9:00 AM today. Cheers!',
      title: 'Good news 😁'
    }
  },
  admin: {
    unaddingSelf: {
      text: 'You\'re unadding yourself as an Admin. You will not be able to add yourself back once you do this.',
      title: 'Are you sure? 🧐'
    }
  },
  announcements: {
    delete: {
      title: 'Are you sure you want to delete this? 😮',
      text: 'Once an announcement is deleted, it\'s gone forever.'
    }
  }
}
export default dialogMessages;
