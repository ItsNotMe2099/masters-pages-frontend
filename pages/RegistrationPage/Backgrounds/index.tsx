import { screen } from 'scss/variables'

interface Props {}

export default function Backgrounds(props: Props) {
  return (
    <div className='root'>
      <img src="/img/Registration/bg/bg.svg" className='bg1' alt=""/>
      <img src="/img/Registration/bg/bg2.svg" className='bg2' alt=""/>
      <img src="/img/Registration/bg/bg3.svg" className='bg3' alt=""/>
      <img src="/img/Registration/bg/bg4.svg" className='bg4' alt=""/>
      <img src="/img/Registration/bg/bg5.svg" className='bg5' alt=""/>
      <img src="/img/Registration/bg/bg6.svg" className='bg6' alt=""/>
      <img src="/img/Registration/bg/bg7.svg" className='bg7' alt=""/>
      <img src="/img/Registration/bg/bg8.svg" className='bg8' alt=""/>
      <img src="/img/Registration/bg/bg9.svg" className='bg9' alt=""/>
      <img src="/img/Registration/bg/bg10.svg" className='bg10' alt=""/>

      <style jsx>{`

        .root{
          z-index: 1;
          position: relative;
        }
        .bg1{
          position: absolute;
          right: 0;
          top: -200px;
        }
        .bg2{
          position: absolute;
          right: 0;
          top: 30%;
        }
        .bg3{
          bottom: 0;
          right: 0;
          position: absolute;
        }
        .bg4{
          bottom: 0;
          position: absolute;
        }
        .bg5{
          position: absolute;
          top: 0;
        }
        .bg6{
          position: absolute;
          top: -200px;
          left: 0;
        }
        .bg7{
          position: absolute;
          top: -200px;
          right: 13.96%;
        }
        .bg8{
          position: absolute;
          bottom: 0;
          right: 18.07%;
        }
        .bg9{
          bottom: 0;
          position: absolute;
        }
        .bg10{
          bottom: 0;
          left: 65px;
          position: absolute;
        }
      `}</style>
    </div>
  )
}
