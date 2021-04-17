import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpenAPI, Operation } from './openapi';
import { ApiResource, ApiPath, OperationType } from './api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'assets/example.json';
  private api!: OpenAPI;
  private _api$: BehaviorSubject<OpenAPI | undefined> = new BehaviorSubject<OpenAPI | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.http.get<OpenAPI>(`${this.apiUrl}`).subscribe(api => this._api$.next(api));
  }

  getApi() {
    return this._api$;
  }

  getResources(api: OpenAPI): Map<string, ApiResource> {
    const resources = new Map<string, ApiResource>();
    Object.keys(api.paths).forEach(path => {
      let operations: Operation[] = [];
      let apiPaths: ApiPath[] = [];
      if (api.paths[path].get) {
        operations.push(api.paths[path].get as Operation);
        apiPaths.push(this._createApiPath(api, path, api.paths[path].get as Operation, OperationType.GET));
      }
      if (api.paths[path].put) {
        operations.push(api.paths[path].put as Operation);
        apiPaths.push(this._createApiPath(api, path, api.paths[path].put as Operation, OperationType.PUT));
      }
      if (api.paths[path].post) {
        operations.push(api.paths[path].post as Operation);
        apiPaths.push(this._createApiPath(api, path, api.paths[path].post as Operation, OperationType.POST));
      }
      if (api.paths[path].delete) {
        operations.push(api.paths[path].delete as Operation);
        apiPaths.push(this._createApiPath(api, path, api.paths[path].delete as Operation, OperationType.DELETE));
      }
      if (api.paths[path].options) {
        operations.push(api.paths[path].options as Operation);
        apiPaths.push(this._createApiPath(api, path, api.paths[path].options as Operation, OperationType.OPTIONS));
      }
      if (api.paths[path].head) {
        operations.push(api.paths[path].head as Operation);
        apiPaths.push(this._createApiPath(api, path, api.paths[path].head as Operation, OperationType.HEAD));
      }
      if (api.paths[path].patch) {
        operations.push(api.paths[path].patch as Operation);
        apiPaths.push(this._createApiPath(api, path, api.paths[path].patch as Operation, OperationType.PATCH));
      }
      if (api.paths[path].trace) {
        operations.push(api.paths[path].trace as Operation);
        apiPaths.push(this._createApiPath(api, path, api.paths[path].trace as Operation, OperationType.TRACE));
      }

      operations?.forEach((operation, index: number) => {
        operation.tags?.forEach(tag => {
          if (resources.has(tag)) {
            const apiResource = resources.get(tag) as ApiResource;
            apiResource.paths.push(apiPaths[index]);
            resources.set(tag, apiResource);
          } else {
            let apiResource: ApiResource = {
              name: tag,
              description: api.paths[path].description as string,
              paths: [apiPaths[index]]
            };
            resources.set(tag, apiResource);
          }
        })
      });
    });
    return resources;
  }

  private _createApiPath(api: OpenAPI, path: string, operation: Operation, type: OperationType) {
    const apiPath: ApiPath = {
      name: path,
      summary: api.paths[path].summary ? api.paths[path].summary : operation.summary,
      description: api.paths[path].description ? api.paths[path].description : operation.description ? operation.description : operation.summary,
      operation: {
        type: type,
        summary: operation.summary,
        description: operation.description,
        operationId: operation.operationId,
        parameters: operation.parameters,
        requestBody: operation.requestBody,
        responses: operation.responses,
        deprecated: operation.deprecated
      },
    };
    return apiPath;
  }

  public getSchema(api: OpenAPI, ref: string) {
    if (ref === "") {
      return null;
    }
    const paths = ref.replace("#/", "").split("/");
    if (api.components.schemas[paths[paths.length - 1]]) {
      return api.components.schemas[paths[paths.length - 1]];
    }

    return null;
  }
}