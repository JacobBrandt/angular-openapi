import { Parameter, ApiResponse, RequestBody, ApiReference } from './openapi';

export enum OperationType {
  GET = "get",
  PUT = "put",
  POST = "post",
  DELETE = "delete",
  OPTIONS = "options",
  HEAD = "head",
  PATCH = "patch",
  TRACE = "trace",
}

export interface ApiOperation {
  type: OperationType;
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: Parameter[];
  requestBody: RequestBody | ApiReference;
  responses: {[id: string]: ApiResponse};
  deprecated: boolean;
}

export interface ApiPath {
  name: string;
  summary?: string;
  description?: string;
  operation: ApiOperation;
}

export interface ApiResource {
  name: string;
  description: string;
  paths: ApiPath[];
}