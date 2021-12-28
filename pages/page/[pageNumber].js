import { useRouter } from 'next/router'
import Page from 'models/Page'
import dbConnect from 'lib/dbConnect'
import Loading from 'components/Loading'

const PageView = ({ text, pageNumber }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading />
  }

  return (
    <div>
      <h1>Page {pageNumber}</h1>
      <p>{text}</p>
    </div>
  )
}

export async function getStaticProps (context) {
  await dbConnect()
  const page = await Page.findOne({ pageNumber: context.params.pageNumber }).lean()
  page._id = page._id.toString()

  if (!page) {
    return {
      notFound: true
    }
  }

  return {
    props: page,
    revalidate: 10
  }
}

export async function getStaticPaths () {
  await dbConnect()
  const pages = await Page.find({}).lean()

  const paths = pages.map((page) => ({
    params: { pageNumber: page.pageNumber.toString() },
  }))

  return { paths, fallback: 'blocking' }
}

export default PageView
