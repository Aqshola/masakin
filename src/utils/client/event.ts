export function eventWindowBeforeClose(callback:Function){
    if(!window) return
  
    window.addEventListener('unload',(event)=>{
      event.preventDefault()
  
  
      callback()
    })
  
  
  
  
  }