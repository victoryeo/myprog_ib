/**
 * JSON Schema for metadata resource model
 */
 export interface MetaDataResourceModel {
  title: string;

  dept_code: string;

  series: string;

  filename: string;

  uuid: string;

  version: number;

  class: string;

  publishDate: Date;

  ipfsUrl: string;
}
