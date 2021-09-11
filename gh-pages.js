var ghpages = require('gh-pages')

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