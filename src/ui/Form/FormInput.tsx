import React from 'react'
import { useField } from 'formik'
import clsx from 'clsx'

interface FormikInputProps {
  label?: string
  name: string
  type?: string
  placeholder?: string
}

const FormikInput: React.FC<FormikInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input
        {...field}
        {...props}
        className={clsx(
          'w-full inline-block h-40 py-4 px-6 outline-none border-1 rounded-md',
          meta.touched && meta.error ? 'input-error' : '',
        )}
      />
      {meta.touched && meta.error ? <div className="mt-4 text-red-700 text-14">{meta.error}</div> : null}
    </div>
  )
}

export default FormikInput
