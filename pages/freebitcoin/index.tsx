import Filter from 'components/for_pages/Common/Filter'
import PageTitle from 'components/for_pages/Common/PageTitle'
import Banner from 'components/for_pages/FreeBitcoin/Banner'
import Table from 'components/for_pages/FreeBitcoin/Table'
import Layout from 'components/layout/Layout'
import { useState } from 'react'
import { Row, Col } from 'react-grid-system'

export default function FreeBitcoin() {

  const games = [

  ]

  const luckyNumber = [
    {number: '0-9885', payout: '0.00000003'},
    {number: '9886 - 9985', payout: '0.00000003'},
    {number: '9986 - 9993', payout: '0.00000003'},
    {number: '9994 - 9997', payout: '0.00000003'},
    {number: '9998 - 9999', payout: '0.00000003'},
    {number: '10000', payout: '0.00000003'}
  ]

  const last = [
    {date: '2021-12-27T12:46:24.007Z', payout: '0.00000003'},
    {date: '2021-12-27T12:46:24.007Z', payout: '0.00000003'},
    {date: '2021-12-27T12:46:24.007Z', payout: '0.00000003'},
    {date: '2021-12-27T12:46:24.007Z', payout: '0.00000003'},
    {date: '2021-12-27T12:46:24.007Z', payout: '0.00000003'},
    {date: '2021-12-27T12:46:24.007Z', payout: '0.00000003'},
  ]

  const [isShow, setIsShow] = useState(false)

  return (
    <Layout>
      <Row>
      <Filter items={games} state={isShow} onClick={() => setIsShow(false)}/>
      <Col>
        <PageTitle icon='/img/Contents/bitcoin.svg' title='Free Bitcoin' onClick={() => isShow ? setIsShow(false) : setIsShow(true)}/>
        <Banner coins='0.0000010001' state='play'/>
        <Row>
          <Table items={luckyNumber}/>
          <Table items={last} last/>
        </Row>
      </Col>
      </Row>
    </Layout>
  )
}