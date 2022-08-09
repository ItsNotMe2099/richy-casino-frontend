import AuthRepository from 'data/repositories/AuthRepository'
import nookies from 'nookies'
import {CookiesType} from 'types/enums'
import {CookiesLifeTime} from 'types/constants'
import {GetServerSideProps} from 'next'
interface Props {
}

export default function AuthSocialSuccess(props: Props) {
  return null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('SocialReqHeaders', context.req.headers)

  const res = await AuthRepository.socialLogin(context.query, context.req.headers.referer)

  if(res.token){
    nookies.set(context, CookiesType.accessToken, res.token, {
      maxAge: CookiesLifeTime.accessToken * 60 * 60 * 24,
      path: '/',
    });
    (context.req as any).cookies[CookiesType.accessToken] = res.token
    return {
      props: {
      },
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {
    },
    redirect: {
      permanent: false,
      destination: '/'
    }
  }
}
