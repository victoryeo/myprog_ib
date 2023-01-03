import * as OpenApiValidator from 'express-openapi-validator';
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

const openApiDocument = yaml.safeLoad(
  fs.readFileSync(
    path.join(__dirname, '../../openapi', 'openapi.yaml'),
    'utf-8'
  )
);

const validator = OpenApiValidator.middleware({
  apiSpec: '../../openapi/openapi.yaml',
})

export default validator;
