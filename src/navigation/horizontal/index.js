import apps from './apps'
import askTavolo from './askTavolo'
import customers from './customers'
import dashboard from './dashboard'
import email from './email'
import messages from './messages'
import profile from './profile'
import schedule from './schedule'

// import others from './others'
import pages from './pages'


export default [...dashboard, ...apps, ...pages,askTavolo, ...email, ...messages, ...customers, ...schedule, ...profile]
