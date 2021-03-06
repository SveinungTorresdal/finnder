var ghpages = require('gh-pages')

/**
 * run with cmd:
 * node ./gh-pages.js
 */

ghpages.publish(
    // path to public directory
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/SveinungTorresdal/finnder.git', 
        user: {
            name: 'SveinungTorresdal',
            email: 'sveinung.torresdal@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)