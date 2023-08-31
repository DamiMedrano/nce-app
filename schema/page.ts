export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    heading: {
      title: 'Heading',
      type: 'string',
    },
    description: {
      title: 'Description',
      type: 'string',
    },
    primaryButtonText: {
      title: 'Primary Button Text',
      type: 'string',
    },
    secondaryButtonText: {
      title: 'Secondary Button Text',
      type: 'string',
    },
    truncateDescription: {
      title: 'Truncate Description',
      type: 'boolean',
    },
  },
  required: [
    'heading',
    'description',
    'primaryButtonText',
    'secondaryButtonText',
  ],
};

export type SchemaType = {
  type: string;
  properties: {
    [key: string]: {
      title: string;
      type: string;
    };
  };
  required: string[];
};
