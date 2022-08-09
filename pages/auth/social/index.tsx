import AuthRepository from 'data/repositories/AuthRepository'
import {GetServerSideProps} from 'next'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAppContext} from 'context/state'
interface Props {
  referer: string
}

export default function AuthSocialSuccess(props: Props) {
  const router = useRouter()
  const appContext = useAppContext()
  const init = async () => {
    const res = await AuthRepository.socialLogin(router.query, props.referer)
    if(res.token){
      appContext.setToken(res.token)
      router.replace('/')
    }

  }
  useEffect(() => {
    init()
  }, [])
  return null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('SocialReqHeaders', context.req.headers)



  return {
    props: {
      referer: context.req.headers.referer
    },

  }
}
