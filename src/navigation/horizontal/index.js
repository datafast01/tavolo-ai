import apps from './apps'
import askTavolo from './askTavolo'
import customers from './customers'
import dashboard from './dashboard'
import email from './email'
import messages from './messages'

// import others from './others'
import pages from './pages'


export default [...dashboard, ...apps, ...pages,askTavolo, ...email, ...messages, ...customers]
