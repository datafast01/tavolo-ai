// import { canNavigate } from '@layouts/plugins/casl'
import { createRouter, createWebHistory } from "vue-router";

// import routes from '~pages'

const routes = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: "/register",
    name: "register",

    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/register.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/login.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: false },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/forgot-password.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: false },
  },
  {
    path: "/reset-password",
    name: "pages-authentication-login-v2",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/pages/authentication/reset-password-v2.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/dashboard/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/tavolo",
    name: "tavolo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/tavolo/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/email",
    name: "email",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/email/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/messages",
    name: "messages",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/messages/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/customers",
    name: "customers",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/customers/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/schedule-emails",
    name: "schedule-emails",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../pages/emails/index.vue"
      ),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/new-campaigns",
    name: "new-campaigns",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../pages/emails/NewCampaigns.vue"
      ),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/campaign-portfolio",
    name: "campaign-portfolio",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../pages/emails/CampaignPortfolio.vue"
      ),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/campaign-performance",
    name: "campaign-performance",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../pages/emails/CampaignPerformance.vue"
      ),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/schedule-messages",
    name: "schedule-messages",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../pages/schedule-messages/index.vue"
      ),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/menuItems",
    name: "menuItems",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/menuItems/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/instagram",
    name: "instagram",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/instagram/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/tiktok",
    name: "tiktok",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/tiktok/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/profile/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/orders",
    name: "orders",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/orders/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/pricing",
    name: "pricing",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/pages/pricing.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/billing-history",
    name: "billing-history",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pages/account-settings/AccountSettingsBillingAndPlans.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/hire-a-pro",
    name: "hire-a-pro",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/videos/hireAPro/index.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/influencer-details/:id",
    name: "influencer-details",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/videos/hireAPro/influencerDetails.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/hiring-influencer/:id",
    name: "hiring-influencer",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/videos/hireAPro/HiringInfluencer.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/create-template",
    name: "create-template",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/emails/components/CreateEmailTemplate.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/contract-details/:id",
    name: "contract-details",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/videos/contracts/ContractDetails.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/contracts",
    name: "contracts",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/videos/contracts/ListContracts.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/sequences",
    name: "email-sequences",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/emails/Sequences.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },
  {
    path: "/sequences/create",
    name: "create-sequences",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/emails/CreateSequence.vue"),
    //  redirect: () => ({  name: 'login' }),
    meta: { requiresAuth: true },
  },

  {
    path: '/:catchAll(.*)', component: () =>
      import(/* webpackChunkName: "about" */ "../pages/pages/misc/not-found.vue"), meta: { requiresAuth: false }
  }
  //  {
  //   path: '/auto-email',
  //   redirect: () => ({  name: 'email' }),
  // },
  //  {
  //   path: '/auto-messages',
  //   redirect: () => ({  name: 'messages' }),
  // },
  // {
  //   path: '/pages/user-profile',
  //   redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
  // },
  // {
  //   path: '/pages/account-settings',
  //   redirect: () => ({ name: 'pages-account-settings-tab', params: { tab: 'account' } }),
  // },

  // ...setupLayouts(routes),
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  let auth = localStorage.getItem("token");



  // Not logged into a guarded route?
  if (to.meta.requiresAuth === true && auth == null) {
    console.log("requires auth, redirect to login");

    next({ name: "login" });
  }

  // Logged in for an auth route
  else if (
    (to.name == "login" || to.name == "register") &&
    auth != null
  ) {
    console.log("login or register, has a user so send home");
    next({ name: "dashboard" });
  }

  if (to.query.session_id) {
    // Construct the redirect URL without the 'session_id' parameter
    const redirectUrl = '/pricing'; // Update with your desired dashboard route

    // Redirect to the new URL
    next(redirectUrl);

    // Alternatively, if you want to redirect using a full URL
    // window.location.href = 'https://www.web.tavolo.ai/dashboard';
  }
  if (to.query.merchant_id && to.query.employee_id) {
    console.log(to.query.merchant_id, 'mercahn', to.query.employee_id)
    localStorage.setItem('merchant_id', to.query.merchant_id)
    localStorage.setItem('employee_id', to.query.employee_id)
    localStorage.setItem('client_id', to.query.client_id)
    localStorage.setItem('clover_code', to.query.code)
    next('/profile');
  }

  // Carry On...
  else next();
});




// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = !!(localStorage.getItem('token'))

//   console.log(isLoggedIn, to)
// if(!isLoggedIn){
//   console.log('here')
//   return { name: 'login' }
// }

// if isLoggedIn is False then user is logged in
// if (to.name !== "login"  && isLoggedIn)
// {
//   next({ name: 'login' })
// }
// else if(to.name == "register"){
//   next({name: 'register'})
// }
// else next()


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

export default router;
