import {getServerSideTranslation} from 'utils/i18'
import {GetServerSideProps} from 'next'
import TournamentPage from 'components/for_pages/TournamentPage'
export default function Tournaments(){

 return <TournamentPage isRound={true}/>
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...await getServerSideTranslation(context)
    }
  }
}
