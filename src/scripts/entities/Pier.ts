import { Identifier } from '../interface/Identifier'

class Pier extends Build implements Identifier {
  isLoaded: boolean = false;

  toggleLoaded(): void {
    this.isLoaded = !this.isLoaded
  }
}