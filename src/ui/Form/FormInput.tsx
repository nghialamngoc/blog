import React, { useState } from 'react'
import { useField } from 'formik'
import clsx from 'clsx'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface FormikInputProps {
  label?: string
  name: string
  type?: string
  placeholder?: string
  className?: string
}

const FormikInput: React.FC<FormikInputProps> = ({ label, className, ...props }) => {
  const [field, meta] = useField(props)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputType = props.type === 'password' && showPassword ? 'text' : props.type

  return (
    <div>
      {label && <label htmlFor={props.name}>{label}</label>}
      <div className="relative">
        <input
          {...field}
          {...props}
          type={inputType}
          className={clsx(
            'w-full inline-block h-40 py-4 px-6 outline-none border-1 rounded-md',
            meta.touched && meta.error ? 'input-error' : '',
            className,
          )}
        />
        {props.type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-8 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOffIcon className="h-[20px] w-[20px] text-gray" />
            ) : (
              <EyeIcon className="h-[20px] w-[20px] text-gray" />
            )}
          </button>
        )}
      </div>

      {meta.touched && meta.error ? <div className="mt-4 text-red-700 text-14">{meta.error}</div> : null}
    </div>
  )
}

export default FormikInput
