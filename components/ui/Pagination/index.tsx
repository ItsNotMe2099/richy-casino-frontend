
import ReactPaginate from 'react-paginate'
import PaginationItem from 'components/ui/Pagination/PaginationItem'
import styles from './index.module.scss'
interface Props {
  handlePageClick: (page) => void
  pageCount?: number
  page?: number
  isMobile?: boolean
}

export default function Pagination(props: Props) {
  return (
    <ReactPaginate
      containerClassName={styles.root}
      onPageChange={props.handlePageClick}
      pageRangeDisplayed={props.isMobile ? 2 : 3}
      marginPagesDisplayed={1}
      pageCount={props.pageCount}
      renderOnZeroPageCount={null}
      activeLinkClassName={styles.active}
      pageLabelBuilder={(page) => <PaginationItem type={'number'} number={page}/>}
      nextLabel={<PaginationItem type={'next'}/>}
      previousLabel={<PaginationItem type={'previous'}/>}
      breakLabel={<PaginationItem type={'break'}/>}
    />
  )
}
