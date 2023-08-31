import React, { useState, ChangeEvent, FormEvent } from 'react';
import FieldRenderer from './FieldRenderer';
import type { SchemaType } from '../schema/page';
import { setDataToDB } from '../lib/db';

interface FormProps {
  schema: SchemaType;
}

const Form: React.FC<FormProps> = ({ schema }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    const fieldValue =
      type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setDataToDB('Damian-Medrano', formData);
      alert("Data saved!");
      setFormData({});

    } catch (error) {
      console.error('Error: ', error);
    }
  }


  return (
    // TODO-1: Form should submit this information
    <form className="space-y-8" onSubmit={handleSubmit}>
      {Object.keys(schema.properties).map((fieldName) => (
        <FieldRenderer
          key={fieldName}
          fieldName={fieldName}
          schema={schema}
          handleInputChange={handleInputChange}
        />
      ))}
      <div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
