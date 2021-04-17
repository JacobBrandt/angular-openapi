import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { OpenAPI } from './openapi';
import { ApiResource } from './api';

@Component({
  selector: 'ng-openapi',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  public api!: OpenAPI;
  public apiResources!: Map<string, ApiResource>;

  constructor(private apiService: ApiService) {
    this.apiService.getApi().subscribe((api: OpenAPI | undefined) => {
      if (api) {
        this.api = api;
        this.apiResources = this.apiService.getResources(this.api);
      }
    });
  }

  ngOnInit(): void {
  }
}
