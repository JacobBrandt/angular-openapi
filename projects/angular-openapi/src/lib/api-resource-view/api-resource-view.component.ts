import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject } from 'rxjs';

import { MatTreeNestedDataSource } from '@angular/material/tree';
import { OpenAPI, Schema, RequestBody, ApiReference } from '../openapi';
import { ApiService } from '../api.service';
import { OperationType, ApiPath } from '../api';

interface Params {
  resource: string;
  operation: OperationType;
  path: string;
}

export class TreeNode {
  constructor(public name: string, public schema: Schema, public parent: Schema) {
  }
}

@Component({
  selector: 'ng-openapi-resource-view',
  templateUrl: './api-resource-view.component.html',
  styleUrls: ['./api-resource-view.component.scss'],
})
export class ApiResourceViewComponent implements OnInit {
  public params!: Params;
  public path!: ApiPath | undefined;
  public api!: OpenAPI;
  public schema!: Schema;
  public treeData = [];
  public treeControl: NestedTreeControl<TreeNode>;
  public dataSource: MatTreeNestedDataSource<TreeNode>

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    const params = this.activatedRoute.snapshot.queryParams as Params;
    this.loadResource(params);

    this.activatedRoute.queryParams.subscribe((params) => {
      this.loadResource(params as Params);
    });
  }

  ngOnInit(): void {
  }

  loadResource(params: Params) {
    this.params = params;
    this.apiService.getApi().subscribe((api: OpenAPI | undefined) => {
      if (api) {
        this.api = api;
        const apiResources = this.apiService.getResources(api);
        const apiResource = apiResources.get(params.resource);
        console.log(apiResource);
        this.path = apiResource?.paths.find(path => {
          return path.name === params.path && path.operation.type === params.operation;
        })
        if (this.path) {
          if (this.path.operation.requestBody && this.path.operation.requestBody.hasOwnProperty("$ref")) {
          } else if(this.path.operation.requestBody) {
            const body = this.path.operation.requestBody as RequestBody;
            Object.keys(body.content).forEach(contentType => {
              if (body.content[contentType].schema.hasOwnProperty("$ref")) {
                this.schema = this.apiService.getSchema(this.api, (body.content[contentType].schema as ApiReference).$ref) as Schema;
              } else {
                this.schema = body.content[contentType].schema as Schema;
              }
            });

            this.treeData = this.createTreeData("", this.schema);
            console.log(this.treeData);
            this.treeControl = new NestedTreeControl<TreeNode>(this.getChildren.bind(this));
            this.dataSource = new MatTreeNestedDataSource();
            this.dataSource.data = this.treeData;
          }
        }
      }
    });
  }

  getChildren(node: TreeNode) {
    const ref = node.schema.$ref ? node.schema.$ref
      : node.schema.type === "array" && node.schema.items.$ref ? node.schema.items.$ref : null;
    if (ref) {
      return this.createTreeData(this.getRefName(ref), this.apiService.getSchema(this.api, ref));
    }
    return [];
  }

  hasChildren(index: number, node: TreeNode) {
    return node.schema.$ref || (node.schema.type === "array" && node.schema.items.$ref);
  }

  getSchemaType(schema: Schema) {
    if (schema.type === "array") {
      if (schema.items.$ref) {
        return `${this.getRefName(schema.items.$ref)} [ ]`;
      } else {
        return `${schema.items.type} [ ]`;
      }
    } else if (schema.$ref) {
      return this.getRefName(schema.$ref);
    }
    return schema.type;
  }

  getRefName(ref: string) {
    let paths = ref.split("/")
    return paths[paths.length - 1];
  }

  isObject(schema: Schema) {
    return schema.$ref;
  }

  createTreeData(name: string, schema: Schema) {
    const tree: TreeNode[] = [];
    if (schema.$ref) {
      const child = this.apiService.getSchema(this.api, schema.$ref) as Schema;
      tree.push(new TreeNode(name, child, schema));
    } else if (schema.properties) {
      Object.keys(schema.properties).forEach((prop: string) => {
        tree.push(new TreeNode(prop, schema.properties[prop], schema));
      });
    }
    return tree;
  }
}
