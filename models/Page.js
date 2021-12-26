import mongoose from 'mongoose'

const PageSchema = new mongoose.Schema({
  text: String,
  pageNumber: Number
})

module.exports = mongoose.models.Page || mongoose.model('Page', PageSchema)