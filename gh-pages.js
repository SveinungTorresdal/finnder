var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/SveinungTorresdal/finnder.git', // Update to point to your repository  
        user: {
            name: 'SveinungTorresdal', // update to use your name
            email: 'sveinung.torresdal@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)