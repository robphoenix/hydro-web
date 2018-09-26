export enum ParameterType {
  SIP = 'SIP',
  IPRange = 'IP_RANGE',
  STK = 'STK',
  RSTK = 'RSTK',
  UQID = 'UQID',
  UserName = 'UNAME',
  UserAgent = 'userAgent',
  ForwardedFor = 'xForwardedFor',
  ClientSIP = 'clientsip',
  STKIP = 'stkip',
  LoginTKN = 'txtTKN'
}

export namespace ParameterType {
  export function values() {
    return Object.keys(ParameterType).filter(
      type => isNaN(<any>type) && type !== 'values'
    );
  }
}
