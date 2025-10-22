import React from 'react'

const Menu = () => {
  return (
   <>
   
   <div className="Menu">
<label htmlFor="">Brush Color</label>
<input type="color"




/>

<label htmlFor="">Brush Width</label>
<input type="range"

min="3"

max = "20"



/>
<label htmlFor="">Brush Opacity</label>
<input type="range"

min="1"

max = "100"



/>

   </div>
   
   </>
  )
}

export default Menu
