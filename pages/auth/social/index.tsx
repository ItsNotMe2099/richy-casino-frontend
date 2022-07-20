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
  const code = context.query.code as string
  const state = context.query.state as string
  const currencyIso = context.query.currency_iso as string
  const res = await AuthRepository.socialLogin(code, state, currencyIso)
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
