
export function validValue(value:any){
    let valid = false;
    
    if(value != undefined || value != null){
        valid = true;
     }
     return valid;
}

export function httpErrors(status:number){
  let error:string;
  switch(status){
    default: error ='Ha ocurrido un error. Inténtelo más tarde.'
    break;
    case 0: error='Error en conexión. Verifique su conexión a internet.'
    break;
    case 403: error = 'Credenciales incorrectas.'
    break;
  }
  return error;

}