import '../styles/card.css'
import SVGComponent from './Pata'
export const Card = ({title, info}) => { 
  return (
    <div className='card'>
      <h2>{title}</h2>
      <h1>{info}</h1>
      <aside className='rank'>
        <SVGComponent style={{width:'30px', height:'30px'}}/>
      </aside>
    </div>
  )
 }