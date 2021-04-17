import { Component, OnInit, Input } from '@angular/core';

import { ApiResource } from '../api';

@Component({
  selector: 'ng-openapi-resource',
  templateUrl: './api-resource.component.html',
  styleUrls: ['./api-resource.component.scss']
})
export class ApiResourceComponent implements OnInit {
  @Input() apiResource!: ApiResource;
 
  constructor() {
  }

  ngOnInit(): void {
  }

}
