import askTavolo from './askTavolo'
import customers from './customers'
import dashboard from './dashboard'
import email from './email'
import messages from './messages'
import profile from './profile'
import schedule from './schedule'
// import templates from './templates'

// import others from './others'


export default [...dashboard,askTavolo, ...email, ...messages, ...customers, ...schedule,  ...profile]
