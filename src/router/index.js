// import { canNavigate } from '@layouts/plugins/casl'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
  routes: [
    // ℹ️ We are redirecting to different pages based on role.
    // NOTE: Role is just for UI purposes. ACL is based on abilities.
    {
      path: '/',
      redirect: () => ({  name: 'dashboard' }),
      meta: true
    },
     {
      path: '/auto-email',
      redirect: () => ({  name: 'email' }),
    },
     {
      path: '/auto-messages',
      redirect: () => ({  name: 'messages' }),
    },
    {
      path: '/pages/user-profile',
      redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
    },
    {
      path: '/pages/account-settings',
      redirect: () => ({ name: 'pages-account-settings-tab', params: { tab: 'account' } }),
    },
    ...setupLayouts(routes),
  ],
})


// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = !!(localStorage.getItem('token'))  

//   console.log(isLoggedIn, to)
// if(!isLoggedIn){
//   console.log('here')
//   return { name: 'login' }
// } 
  router.beforeEach((to, from, next) => {
    const isLoggedIn = !(localStorage.getItem('token'))  
    console.log(isLoggedIn)
  if (to.name !== "login" && isLoggedIn) 
  {
   
 next({ name: 'login' })
 
  }
 
  else next()

  
//     // ℹ️ Commented code is legacy code
  
//     if (to) {
//       // Redirect to login if not logged in
//       // ℹ️ Only add `to` query param if `to` route is not index route
//       if (!isLoggedIn)
    
//         return next({ name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } })
  
//       // If logged in => not authorized
//       return next({ name: 'not-authorized' })
//     }
  
//     // Redirect if logged in
//     if (to.meta.redirectIfLoggedIn && isLoggedIn)
//       next('/')
  
//     return next()
  
    
  // if (canNavigate(to)) {
  //   if (to.meta.redirectIfLoggedIn && isLoggedIn)
  //     return '/'
  // }
  // else {
  //   if (isLoggedIn)
  //     return { name: 'not-authorized' }
  //   else
  //     return { name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } }
  // }
})
export default router
