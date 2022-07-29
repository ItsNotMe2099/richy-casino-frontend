import AuthRepository from 'data/repositories/AuthRepository'
import nookies from 'nookies'
import {CookiesType} from 'types/enums'
import {CookiesLifeTime} from 'types/constants'
interface Props {
}

export default function AuthSocialSuccess(props: Props) {
 return null
}

export const getServerSideProps = async (context) => {

  const res = await AuthRepository.socialLogin(context.query)
  if(res.token){
    nookies.set(context, CookiesType.accessToken, res.token, {
      maxAge: CookiesLifeTime.accessToken * 60 * 60 * 24,
      path: '/',
    });
    (context.req as any).cookies[CookiesType.accessToken] = res.token
  }

  return {
    props: {
    },
    redirect: {
      permanent: true,
    }
  }
}
