import moment from "moment";

export function log(type: string, msg: string = '') {
  console.log(`--${moment().format('YYYY-MM-DD HH:MM:SS')}--: [${type}]${msg}`)
}
