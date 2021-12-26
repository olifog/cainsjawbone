import dbConnect from 'lib/dbConnect'
import Page from 'models/Page'

export default async function handler (req, res) {
  await dbConnect()

  const pages = await Page.find({})
  res.status(200).json(pages)
}