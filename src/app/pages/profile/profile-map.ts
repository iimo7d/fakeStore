import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-profile-map',
  template: `<div
    #mapContainer
    class="h-72 w-full rounded-xl"
    role="region"
    aria-label="Map showing the user's address"
  ></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMap {
  readonly latitude = input.required<string>();
  readonly longitude = input.required<string>();

  private readonly mapContainer = viewChild.required<ElementRef<HTMLElement>>('mapContainer');

  constructor() {
    afterNextRender(() => this.initializeMap());
  }

  private initializeMap(): void {
    const latitude = Number(this.latitude());
    const longitude = Number(this.longitude());

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }

    const coordinates: L.LatLngExpression = [latitude, longitude];
    const map = L.map(this.mapContainer().nativeElement, {
      scrollWheelZoom: false,
    }).setView(coordinates, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.circleMarker(coordinates, {
      radius: 8,
      color: '#4338ca',
      fillColor: '#4f46e5',
      fillOpacity: 0.9,
      weight: 3,
    })
      .addTo(map)
      .bindPopup('My Address');
  }
}
