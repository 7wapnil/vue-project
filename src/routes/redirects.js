export const Redirects = {
  routes: [
    { path: '/lostPassword', redirect: '/' },
    { path: '/register', redirect: '/' },
    { path: '/live-casino/europe', redirect: '/' },
    { path: '/about-us', redirect: '/about/about-arcanebet' },
    { path: '/site-features', redirect: '/about/about-arcanebet' },
    { path: '/welcome-bonus-terms-and-conditions', redirect: '/promotions/bonus-rules' },
    { path: '/UI', redirect: '/sports' },
    { path: '/bitcoin-betting-rules', redirect: '/support/betting-rules' },
    { path: '/sport-rules', redirect: '/support/betting-rules' },
    { path: '/privacy-policy', redirect: '/support/privacy-policy' },
    { path: '/general-bonus-terms-and-conditions', redirect: '/support/terms-and-conditions' },
    { path: '/responsible-gaming', redirect: '/responsible-gaming/introduction' },
    { path: '/terms-and-conditions', redirect: '/support/terms-and-conditions' },
    { path: '/identity-verification', redirect: '/responsible-gaming/introduction' },
    { path: '/sport/esports', redirect: '/esports' },
    { path: '/sport/esport-live', redirect: '/esports' },
    { path: '/sport/esports/:slug', redirect: '/esports' },
    { path: '/sport/:slug', redirect: '/sports' },
    { path: '/esports/:slug', redirect: '/esports' }
  ]
}

export default Redirects
