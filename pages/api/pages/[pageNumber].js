import dbConnect from 'lib/dbConnect'
import Page from 'models/Page'

export default async function handler (req, res) {
  const { pageNumber } = req.query
  switch (req.method) {
    case "GET":
      await dbConnect()
      const page = await Page.findOne({ pageNumber: pageNumber }) || {}
      res.status(200).json(page)
      break
    case "POST":
      await dbConnect()

      const doc = {
        pageNumber: pageNumber,
        text: req.body
      }

      await Page.updateOne({ pageNumber: pageNumber }, doc, { upsert: true })
      res.status(200).json({ success: true })
      break
  }
}