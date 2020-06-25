# 🍐 ga-hit-count-serverless

> Google Analytics hit count API for static websites. Deployed on Vercel.

**中文说明：**[Hit count：用 Google Analytics + Vercel Serverless 为文章添加浏览量统计](https://blog.spencerwoo.com/2020/06/serverless-ga-hit-count-api/)

## See it in action

- [Spencer's Blog](https://blog.spencerwoo.com/)

## How to deploy?

### Getting started

First, fork this project to your own GitHub account.

Second, acquire a Google API credential file following the procedure explained here: [Analytics Reporting API v4 - Enable the API](https://developers.google.com/analytics/devguides/reporting/core/v4/quickstart/service-py#1_enable_the_api). You will get a JSON credential which looks like:

```jsonc
{
  // ...
  "project_id": "ga-hit-count",
  "private_key": "-----BEGIN PRIVATE KEY-----\nxxx-----END PRIVATE KEY-----\n",
  "client_email": "blog-hit-count@ga-hit-count.iam.gserviceaccount.com",
  // ...
}
```

**You will need to add the `client_email` to your Google Analytics user, and grant permissions `Read and Analyze` if you haven't done so already.** Details: [Add, edit, and delete users and user groups](https://support.google.com/analytics/answer/1009702).

Finally, change `api/config.ts` according to your own Google API details.

| key           | value                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `viewId`      | Check Google Analytics Dashboard: Admin » View » View Settings                                                          |
| `projectId`   | Your Google API project ID. (From credentials JSON file.)                                                               |
| `privateKey`  | Your Google API private Key. **DO NOT CHANGE THIS!** (We will add this private key via Vercel environment variables.)   |
| `clientEmail` | Your Google API client email. (From credentials JSON file.)                                                             |
| `allFilter`   | The filter you wish to apply for your posts. (Default `['/20']`, because my posts' path begin with `/2019` or `/2020`.) |
| `startDate`   | The start date you wish to query your Google Analytics API. (Default `2010-01-01`, any date old enough should work.)    |

### Deploying to Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=spencerwooo%2Fga-hit-count-serverless)

After importing your forked version of this project to Vercel, you'll need to add your Google API private key to Vercel environment variable. Create a new variable named `PRIVATE_KEY` and copy the private key into it. **Your private key should look like this (i.e., remove all `\n` and replace with real linebreaks.):**

```
-----BEGIN PRIVATE KEY-----
dageWvAIBADANBAokdP8WgkqhkiGkk
...
afROdsafbliOjPA==1Hk3mdsafEdBa
-----END PRIVATE KEY-----
```

After this, trigger a new deploy to production.

## API

Base URL:

```
https://{VERCEL_DOMAIN_NAME}.vercel.app
```

### Query all posts

Request:

```
/api/ga
```

Response demo:

```jsonc
[
  {
    "page": "/2019/11/tiny-tiny-rss/",
    "hit": "698"
  },
  {
    "page": "/2019/11/weibo-to-twitter/",
    "hit": "531"
  },
  {
    "page": "/2020/03/ttrss-noteworthy/",
    "hit": "357"
  },
  // ...
]
```

### Query specific post

Request:

```
/api/ga?page={WEBSITE_PAGE_PATH}
```

Request demo:

```
/api/ga?page=/2020/03/substats/
```

Response demo:

```jsonc
[
  {
    "page": "/2020/03/substats/",
    "hit": "311"
  }
]
```

---

**🍐 GA Hit Count API for Vercel** ©Spencer Woo. Released under the [MIT License](LICENSE).

Authored and maintained by Spencer Woo.

[@Portfolio](https://spencerwoo.com/) · [@Blog](https://blog.spencerwoo.com/) · [@GitHub](https://github.com/spencerwooo)
