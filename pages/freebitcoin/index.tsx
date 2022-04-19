import Filter from 'components/for_pages/Common/Filter'
import PageTitle from 'components/for_pages/Common/PageTitle'
import Banner from 'components/for_pages/FreeBitcoin/Banner'
import Table from 'components/for_pages/FreeBitcoin/Table'
import Layout from 'components/layout/Layout'
import {useEffect, useState} from 'react'
import {Row, Col} from 'react-grid-system'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import FreeBitcoinRepository from 'data/repositories/FreeBitcoinRepository'
import {IFreeBitcoinSlot} from 'data/interfaces/IFreeBitcoinSlot'
import {IFreeBitcoinHistory} from 'data/interfaces/IFreeBitcoinHistory'
import {IFreeBitcoinUserStatus} from 'data/interfaces/IFreeBitcoinUserStatus'
import {IFreeBitcoinGame} from 'data/interfaces/IFreeBitcoinGame'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'

export default function FreeBitcoin() {
  const {t} = useTranslation()
  const context = useAppContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [slots, setSlots] = useState<IFreeBitcoinSlot[]>([])
  const [history, setHistory] = useState<IFreeBitcoinHistory[]>([])
  const [userStatus, setUserStatus] = useState<IFreeBitcoinUserStatus>(null)
  const [game, setGame] = useState<IFreeBitcoinGame>(null)
  useEffect(() => {
    console.log('context.auth ', context.user )
    Promise.all([
      FreeBitcoinRepository.fetchSlots().then(i => setSlots(i)),
      FreeBitcoinRepository.fetchHistory().then(i => setHistory(i)),
      FreeBitcoinRepository.fetchGame().then(i => setGame(i)),
      ...(context.auth ? [FreeBitcoinRepository.fetchUserStatus().then(i => setUserStatus(i))] : []),
    ]).then(() => setLoading(false))
  }, [])

  const [isShow, setIsShow] = useState(false)

  return (
    <Layout>
      <Row>
        <Filter state={isShow} onClick={() => setIsShow(false)}/>
        <Col>
          <PageTitle icon='/img/Contents/bitcoin.svg' title={t('freebitcoin_title')}
                     onClick={() => isShow ? setIsShow(false) : setIsShow(true)} shadowColor='yellow'/>
          <Banner coins='0.0000010001' state='timer'/>
          <Row>
            <Table items={slots}/>
            <Table items={history} history/>
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
    },
  }
}
