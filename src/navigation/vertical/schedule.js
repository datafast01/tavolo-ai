export default [
 
   {
    title: 'List Campaigns',
    icon: { icon: 'mdi-account-multiple' },
     children: [
      {
        title: 'List Emails Campaigns',
        icon: { icon: 'mdi-account-circle-outline' },
       to: { name: 'schedule-emails' },
      },
      {
        title: 'List Messages Campaigns',
        icon: { icon: 'mdi-account-circle-outline' },
        to: { name: 'schedule-messages' },
      },
   ]
   
  },
  
]
