class Ship extends Transport implements IsActive {
  isActive: boolean = false;

  toggleActive(): void {
    this.isActive = !this.isActive;
  }

  move() {
    console.log(`${this.name} is moving`);
  }
}