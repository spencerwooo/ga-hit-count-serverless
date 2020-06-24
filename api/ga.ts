import { NowRequest, NowResponse } from '@vercel/node'

export default (req: NowRequest, resp: NowResponse) => {
  console.log(req)

  const { name = 'world' } = req.query
  resp.status(200).send(`Hello ${name}`)
}
