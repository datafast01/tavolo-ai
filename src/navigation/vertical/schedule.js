export default [

  {
    title: 'Campaigns',
    icon: { icon: 'mdi-voice' },
    children: [
      {
        title: 'Emails Campaigns',
        icon: { icon: 'mdi-email' },
        children: [
          {
            title: 'New Campaigns',
            icon: { icon: 'mdi-comment-plus-outline' },
            to: { name: 'new-campaigns' },
          },
          {
            title: 'Email Sequences',
            icon: { icon: 'mdi-message-text-outline' },
            to: { name: 'email-sequences' },
          },
          // {
          //   title: 'Campaign Portfolio',
          //   icon: { icon: 'mdi-message-text-outline' },
          //   to: { name: 'campaign-portfolio' },
          // },
          {
            title: 'Campaign Performance',
            icon: { icon: 'mdi-message-text-outline' },
            to: { name: 'campaign-performance' },
          }
        ]
      },
      {
        title: 'SMS Campaigns',
        icon: { icon: 'mdi-message-text-outline' },
        children: [
          {
            title: 'Text Messages',
            icon: { icon: 'mdi-message-text-outline' },
            to: 'messages',

          },
          {
            title: 'Schedule Messages',
            icon: { icon: 'mdi-message-text-outline' },
            to: { name: 'schedule-messages' },

          },
        ]
      },

    ]

  },

]
