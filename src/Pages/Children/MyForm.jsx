import React from 'react';
import { useFormik } from 'formik';
// Adjust the path below to where you saved your fields file
import { fields, schema, getTopicsByGrade } from './fields'; 

// --- PLACEHOLDER COMPONENTS (Define these in your actual project) ---
const TextInput = ({ name, label, ...props }) => (
    <div><label>{label}</label><input name={name} {...props} /></div>
);
const SelectInput = ({ name, label, options, multi, ...props }) => (
    <div>
        <label>{label}</label>
        <select name={name} multiple={multi} {...props} >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);
// -------------------------------------------------------------------

const initialValues = {
    name: '',
    age: '',
    grade: '',
    topics: [],
};

const MyForm = () => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: (values) => {
            console.log('Form Submitted:', values);
        },
    });

    // 1. Get the current selected grade from Formik's state
    const selectedGrade = formik.values.grade;
    
    // 2. Dynamically calculate the topic options using the helper function
    // This executes every time the grade changes, updating the options.
    const dynamicTopicOptions = getTopicsByGrade(selectedGrade);

    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Dynamic Topic Form</h1>
            
            {fields.map(field => {
                const { name, label, type, options, multi, ...rest } = field;
                const fieldProps = {
                    key: name,
                    name,
                    label,
                    value: formik.values[name],
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                    error: formik.touched[name] && formik.errors[name],
                    ...rest
                };

                if (name === 'topics') {
                    // *** CRITICAL STEP: Use the dynamically calculated options ***
                    return <SelectInput 
                                {...fieldProps} 
                                options={dynamicTopicOptions} 
                                multi={multi}
                            />;
                }
                
                if (type === 'select') {
                    return <SelectInput {...fieldProps} options={options} />;
                }

                if (type === 'text' || type === 'number') {
                    return <TextInput {...fieldProps} type={type} />;
                }
                return null;
            })}
            
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;