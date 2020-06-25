/**
 * Google Analytics query configurations
 *
 * ! If you are deploying this with your own account
 * ! , then you will need to change this config file.
 * ! Don't put your privateKey inside this file directly!
 */
export default {
  viewId: '205703100',
  auth: {
    projectId: 'ga-hit-count',
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: 'blog-hit-count@ga-hit-count.iam.gserviceaccount.com',
  },
  allFilter: ['/20'],
  startDate: '2010-01-01',
}
