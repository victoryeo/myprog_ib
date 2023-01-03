export interface VerifyQrDto {
  dept_code: string;
  series: string;
  title: string;
  version: string;
  class: string;
  filename: string;
  publishDate: Date;
  hash1: string;
  hash2: string;
  digiSign: string;
  ipfsURL: string;
}
