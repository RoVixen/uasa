/**
 * Esta funcion simplemente sirve para ayudar a separar las clases de tailwind entre varias lienas, asi no
 * hay que estar atento a poner espacios al final de cada linea, me refiero al: 
 * - "clase clase clase "+
 * - " clase clase"+
 * - "clase clase"
 * 
 * observa los espacios que hay que poner al principio o final de cada linea para que no se mezclen las clases
 */
function TWMixer(classes:string|string[]){
  if(typeof classes !== "string" && !Array.isArray(classes))
  throw new Error("TWMixer: el parametro classes debe ser un string o un Array, has pasado un "+(typeof classes))

  if(Array.isArray(classes))
  return classes.join(" ")

  return classes
}

export default TWMixer