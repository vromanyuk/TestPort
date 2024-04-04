class Pier extends Build implements IsActive {
  isActive: boolean = false;

  toggleActive(): void {
    this.isActive = !this.isActive
  }
}