export class ConversionsUtil {
  private static readonly EARTH_RADIUS = 6371000;
  static meterToRadian(meter: number) {
    return meter / this.EARTH_RADIUS;
  }
}
