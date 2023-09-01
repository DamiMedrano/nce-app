import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import FieldRenderer from './FieldRenderer';
import type { SchemaType } from '../schema/page';
import { setDataToDB } from '../lib/db';
import { validateField } from '../utils/validateField';

interface FormProps {
  schema: SchemaType;
}

const Form: React.FC<FormProps> = ({ schema }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [truncateDescription, setTruncateDescription] = useState(false);
  let debounceTimeout: NodeJS.Timeout;

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    if (name === 'truncateDescription') {
      setTruncateDescription((event.target as HTMLInputElement).checked);
      console.log(truncateDescription);
    }
    const fieldValue =
      type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));

    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      const error = validateField(name, fieldValue);

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));

      setDataToDB('Damian-Medrano', formData).catch((error) => {
        console.error('Error setting data:', error);
      });
    }, 500);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      // Truncate description if needed
      let truncatedDescription = formData.description;
      if (truncateDescription || truncatedDescription.length > 100) {
        truncatedDescription = truncatedDescription.substring(0, 100) + '...';
      }

      // Update form data with truncated description
      const updatedFormData = {
        ...formData,
        description: truncatedDescription,
      };

      setDataToDB('Damian-Medrano', updatedFormData);
      alert("Data saved!");
      setFormData({});
      setTruncateDescription(false); // Reset truncateDescription
    } catch (error) {
      console.error('Error:', error);
    }
    setSubmitting(false);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {Object.keys(schema.properties).map((fieldName) => (
        <FieldRenderer
          key={fieldName}
          fieldName={fieldName}
          schema={schema}
          handleInputChange={handleInputChange}
          error={errors[fieldName]}
          formData={formData}
          placeholder={schema.properties[fieldName].placeholder}
          condition={schema.properties[fieldName].condition}
          truncateDescription={truncateDescription}
        />
      ))}
      <div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Form;
