import dbConnect from 'lib/dbConnect'
import Page from 'models/Page'

export default async function handler (req, res) {
  await dbConnect()
  const { pageNumber } = req.query

  const page = await Page.findOne({ pageNumber: pageNumber }) || {}
  res.status(200).json(page)
}