export default [
 
   {
    title: 'Campaigns',
    icon: { icon: 'mdi-voice' },
     children: [
      {
        title: 'Emails Campaigns',
        icon: { icon: 'mdi-email' },
       to: { name: 'schedule-emails' },
      },
      {
        title: 'Messages Campaigns',
        icon: { icon: 'mdi-message-text-outline' },
        to: { name: 'schedule-messages' },
      },
   ]
   
  },
  
]
