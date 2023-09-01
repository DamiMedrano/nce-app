import React, { ChangeEvent } from 'react';
import type { SchemaType } from '../schema/page';

interface FieldRendererProps {
  fieldName: string;
  schema: SchemaType;
  error?: string;
  placeholder?: string;
  condition?: (formData: any) => boolean;
  formData: { [key: string]: any };
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  fieldName,
  schema,
  error,
  formData,
  placeholder,
  condition,
  handleInputChange,
}) => {
  const { title, type } = schema.properties[fieldName];

  if (!condition) {
    return null; // Don't render the input if the condition is not met
  }

  if (type === 'string') {
    return (
      <div key={fieldName} className="mb-4">
        <label htmlFor={fieldName} className="block text-gray-700">
          {title}
        </label>
        <input
          required
          type="text"
          id={fieldName}
          name={fieldName}
          onChange={handleInputChange}
          className={`mt-1 px-4 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            error ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
          value={formData[fieldName] || ''}
        />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div key={fieldName} className="mb-4">
        <label htmlFor={fieldName} className="block text-gray-700">
          {title}
        </label>
          <textarea
            required
            id={fieldName}
            name={fieldName}
            rows={8}
            onChange={handleInputChange}
            className={`mt-1 px-4 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              error ? 'border-red-500' : ''
            }`}
            placeholder={placeholder}
            value={formData[fieldName] || ''}
          ></textarea>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  if (type === 'boolean') {
    return (
      <div key={fieldName} className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id={fieldName}
            name={fieldName}
            onChange={handleInputChange}
            className="mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor={fieldName} className="block text-gray-700">
            {title}
          </label>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  // Display an error message if it's an unsupported input type
  console.error(`Unsupported input type: ${type} for field ${fieldName}`);
  return (
    <div key={fieldName} className="mb-4">
      <p className="text-red-500">Unsupported input type: {type}</p>
    </div>
  );
};

export default FieldRenderer;
