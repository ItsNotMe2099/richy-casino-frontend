import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'


interface Props{

}
export default function Board(props: Props) {
  const handleClick = (key) => {
    console.log(key)
  }

  return (
    <GamePageBoardLayout>

    </GamePageBoardLayout>
  )
}


