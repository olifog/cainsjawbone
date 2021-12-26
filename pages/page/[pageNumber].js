import { useRouter } from 'next/router'
import host from 'utils/host'
import Loading from 'components/Loading'


const Page = (page) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading />
  }

  const { pageNumber } = router.query
  return <p>Page: {pageNumber}</p>
}


export async function getStaticProps (context) {
  const res = await fetch(`${host}/api/pages/${context.params.pageNumber}`)
  const page = await res.json()

  if (!page) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      page
    },
    revalidate: 10
  }
}


export async function getStaticPaths () {
  const res = await fetch(`${host}/api/pages`)
  const pages = await res.json()

  const paths = pages.map((page) => ({
    params: { pageNumber: page.pageNumber.toString() },
  }))

  return { paths, fallback: true }
}


export default Page

