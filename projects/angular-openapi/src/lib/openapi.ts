export interface Contact {
  name?: string;
  url?: string;
  email?: string;
}

export interface License {
  name?: string;
  url?: string;
}

export interface Info {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  license?: License;
  version: string;
}

export interface ServerVariable {
  enum?: string[];
  default: string;
  description?: string;
}

export interface Server {
  url: string;
  description?: string;
  variables: Map<string, ServerVariable>;
}

export interface ApiXml {
  name: string;
  namespace: string;
  prefix: string;
  attribute: boolean;
  wrapped: boolean;
}

export interface Schema extends ApiReference {
  required: string[];
  type: string;
  properties: Map<string, Schema>;
  format?: string;
  minLength?: number;
  maxLength?: number;
  nullable?: boolean;
  // discriminator?: Discriminator;
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: ApiXml;
  // externalDocs?: ExternalDoc;
  example?: any;
  deprecated?: boolean;
  items: Schema;
}

export interface Parameter {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  schema: Schema;
}

export interface Header {
  description?: string;
  schema: Schema;
}

export interface Example {
  summary: string;
  description: string;
  value: any;
  externalValue: string;
}

export interface Encoding {
  contentType: string;
  headers: Map<string, Header | ApiReference>;
  style: string;
  explode: boolean;
  allowReserved: boolean;
}

export interface Media {
  schema: Schema | ApiReference;
  example: any;
  examples: Map<string, Example>;
  encoding: Map<string, Encoding>;
}

export interface Link {
  operationRef?: string;
  operationId: string;
  parameters?: Map<string, {[id: string]: string}>;
  requestBody?: {[id: string]: string} | any;
  description?: string;
  server: Server;
}

export interface ApiResponse {
  description: string;
  headers?: Map<string, Header>;
  content?: {[id: string]: Media};
  links?: Map<string, Link>;
}

export interface RequestBody {
  description: string;
  content: {[id: string]: Media};
  required: boolean;
}

export interface ApiReference {
  $ref: string;
}

export interface Operation {
  tags?: string[];
  summary?: string;
  description?: string;
  // externalDocs: ExternalDoc
  operationId?: string;
  parameters: Parameter[];
  requestBody: RequestBody | ApiReference;
  responses: {[id: string]: ApiResponse};
  // callbacks: Callback
  deprecated: boolean;
  // security: Security;
  servers: Server[]
}

export interface Path {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
  trace?: Operation;
  servers?: Server[];
  parameters: Parameter[];
}

export interface Tag {
  name: string;
  description?: string;
}

export interface ApiComponents {
  schemas: {[id: string]: Schema};
  responses: Map<string, ApiResponse>;
  parameters: Map<string, Parameter>;
  examples: Map<string, Example>;
  requestBodies: Map<string, RequestBody>;
  headers: Map<string, Header>;
}

export class OpenAPI {
  openapi: string;
  info: Info;
  servers: Server[];
  paths: {[id: string]: Path};
  components: ApiComponents;
  tags: Tag[];

  constructor(data: {
    openapi: string,
    info: Info,
    servers: Server[],
    paths: {[id: string]: Path},
    components: ApiComponents,
    tags: Tag[]
  }) {
    this.openapi = data.openapi;
    this.info = data.info;
    this.servers = data.servers;
    this.paths = data.paths;
    this.components = data.components;
    this.tags = data.tags;
  }

  getTags() {
    return this.tags;
  }

  getPaths(tag: string): {[id: string]: Path} {
    const paths: {[id: string]: Path} = {};
    const operations = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];
    Object.keys(this.paths).forEach((path: string) => {
      operations.forEach(operation => {
        if (this.paths[path].get?.tags && this.paths[path].get?.tags?.includes(tag)) {
          paths[path] = this.paths[path];
        }
        else if (this.paths[path].put?.tags && this.paths[path].put?.tags?.includes(tag)) {
          paths[path] = this.paths[path];
        }
        else if (this.paths[path].post?.tags && this.paths[path].post?.tags?.includes(tag)) {
          paths[path] = this.paths[path];
        }
        else if (this.paths[path].delete?.tags && this.paths[path].delete?.tags?.includes(tag)) {
          paths[path] = this.paths[path];
        }
        else if (this.paths[path].options?.tags && this.paths[path].options?.tags?.includes(tag)) {
          paths[path] = this.paths[path];
        }
        else if (this.paths[path].head?.tags && this.paths[path].head?.tags?.includes(tag)) {
          paths[path] = this.paths[path];
        }
        else if (this.paths[path].patch?.tags && this.paths[path].patch?.tags?.includes(tag)) {
          paths[path] = this.paths[path];
        }
        else if (this.paths[path].trace?.tags && this.paths[path].trace?.tags?.includes(tag)) {
          paths[path] = this.paths[path];
        }
      });
    });

    return paths;
  }
}