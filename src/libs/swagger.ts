import { Express } from 'express';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import config from 'config';
import { OpenApiValidator } from 'express-openapi-validate';

export const ConnectSwagger = (app: Express) => {
  const fullPath = path.resolve(config.get('path.swagger'));
  const swaggerDocument = YAML.load(fullPath);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  const validator = new OpenApiValidator(swaggerDocument);
  app.use(validator.match());
};
