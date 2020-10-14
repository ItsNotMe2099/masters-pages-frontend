
interface Props {}

export default function Background(props: Props) {
  return (
    <>
      <img src="img/CommentsSection/bg.png" className="bg"/>

      <style jsx>{`
        .bg{
          position: absolute;
          z-index: 1;
        }
        `}</style>
    </>
  )
}
