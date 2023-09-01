export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    heading: {
      title: 'Heading',
      type: 'string',
      condition: true,
      placeholder: 'Enter a heading',
    },
    description: {
      title: 'Description',
      type: 'text',
      condition: true,
      placeholder: 'Enter a description',
    },
    primaryButtonText: {
      title: 'Primary Button Text',
      type: 'string',
      condition: true,
      placeholder: 'Enter button text',
    },
    secondaryButtonText: {
      title: 'Secondary Button Text',
      type: 'string',
      condition: true,
      placeholder: 'Enter button text',
    },
    truncateDescription: {
      title: 'Truncate Description',
      type: 'boolean',
      condition: formData => formData.description.length > 100,
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
      placeholder?: string;
      condition?: (formData: any) => boolean;
    };
  };
  required: string[];
};
