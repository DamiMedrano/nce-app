  export const validateField = (name: string, value: any): string | undefined => {
    if (!value && value !== false) {
      return "This field is required";
    }

    if (name === "heading" && value.length > 20) {
      return "Heading can't be longer than 20 characters";
    }

    if (name === "Primary Button Text" && value.length > 15) {
      return "Description can't be longer than 15 characters";
    }
    
    if (name === "Secondary Button Text" && value.length > 10) {
      return "Description can't be longer than 10 characters";
    }
    

    if (name === "description" && value.length > 100) {
      return "Description can't be longer than 100 characters";
    }

    return undefined;
  };