class socket {
  static endpoint = "localhost:3000/api";
  constructor() {
    this.running = false;
  }

  isRunning = () => {
    return this.running;
  };
}
