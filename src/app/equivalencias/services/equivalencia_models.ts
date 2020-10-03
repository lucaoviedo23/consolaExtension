import { prestador_instalacion_os } from 'src/app/Models/Prestador_instalacion_os';

export class Equivalencia {
  codigoPrestacionOsde: string;
  codigoPrestacionPrestador: string;
  codigoPrestador: string;
  filialPrestador: string;
 }


export class ObraSocial {
  obra_social_id: string;
  obra_social_codigo: string;
  obra_social_desc: string;
  
}

export class filterEquivalenciaRequest {
  codigoPrestador: string;
  filialPrestador: string;
}

export class prestacionOsdeEquivalenciaByIdRequest {
    codigoPrestacionPrestador: string;
    codigoPrestador: string;
  filialPrestador: string;
}

export class PrestadorObraSocialResponse {
  items: ObraSocial[];
}

export class traerEquivalenciasOsdeResponse {
  items: Equivalencia[];
  item: prestador_instalacion_os;
}

export class codigoPrestacionOsdeEquivalenciaByIdResponse {
  item: Equivalencia;
}


export class EquivalenciaInsertRequest {
  item: Equivalencia;
}
export class EquivalenciaEditarRequest {
  item: Equivalencia;
}
export class EquivalenciaEliminarRequest {
  item: Equivalencia;
}




