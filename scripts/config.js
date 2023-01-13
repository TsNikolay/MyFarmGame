export default class Config {
  constructor() {
    this.rows = 19;
    this.columns = 9;

    this.keys = {
      w: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
    };
  }
}
