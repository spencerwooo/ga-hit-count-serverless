import { NowRequest, NowResponse } from '@vercel/node'
import { google } from 'googleapis'
import config from './config'

/**
 * Blog hit count. Served by Google Analytics
 */
export default async (req: NowRequest, resp: NowResponse) => {
  // API query page parameter
  const { page = '' } = req.query

  // page path filter
  const filter =
    page === ''
      ? { dimensionName: 'ga:pagePath', operator: 'BEGINS_WITH', expressions: ['/20'] }
      : {
          dimensionName: 'ga:pagePath',
          operator: 'EXACT',
          expressions: [page] as string[],
        }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: config.privateKey,
      client_email: config.clientEmail,
    },
    projectId: config.projectId,
    scopes: 'https://www.googleapis.com/auth/analytics.readonly',
  })
  const client = await auth.getClient()
  const analyticsreporting = google.analyticsreporting({
    version: 'v4',
    auth: client,
  })

  const gaReport = await analyticsreporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: '205703100',
          dateRanges: [
            {
              startDate: '2010-01-01',
              endDate: 'today',
            },
          ],
          metrics: [
            {
              expression: 'ga:pageviews',
            },
          ],
          dimensions: [
            {
              name: 'ga:pagePath',
            },
          ],
          dimensionFilterClauses: [
            {
              filters: [filter],
            },
          ],
          orderBys: [
            {
              fieldName: 'ga:pageviews',
              sortOrder: 'DESCENDING',
            },
          ],
        },
      ],
    },
  })
  const report = gaReport.data.reports[0].data

  let res = []
  if (report.totals[0].values[0] === '0') {
    res = [{ page: page, hit: '0' }]
  } else {
    report.rows.forEach(r => {
      // Remove all pages with querys
      if (!r.dimensions[0].includes('?')) {
        res.push({ page: r.dimensions[0], hit: r.metrics[0].values[0] })
      }
    })
  }

  resp.setHeader('Access-Control-Allow-Origin', '*')
  resp.status(200).send(res)
}
