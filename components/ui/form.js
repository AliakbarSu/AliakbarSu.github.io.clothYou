import * as React from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'

import { ChevronDownSmallIcon } from '@/components/icons'

function Form({ children, methods, onSubmit, formRef, ...props }) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} ref={formRef} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

const Input = React.forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      field,
      placeholder,
      label,
      type = 'text',
      multiple
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        <label htmlFor={field}>{label}</label>
        <input
          multiple
          id={field}
          name={field}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
          ref={ref}
        />
        {children}
      </fieldset>
    )
  }
)

const Select = React.forwardRef(
  (
    {
      children,
      className,
      defaultValue = '',
      disabled,
      field,
      label,
      options,
      ...props
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        {label ? (
          <label htmlFor={field} className="sr-only">
            {label}
          </label>
        ) : null}
        <div className="relative">
          <select
            id={field}
            name={field}
            disabled={disabled}
            defaultValue={defaultValue}
            className="appearance-none block w-full bg-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={ref}
            {...props}
          >
            <option disabled value="">
              Please select an option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
            <ChevronDownSmallIcon
              className="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
        {children}
      </fieldset>
    )
  }
)

const Textarea = React.forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      field,
      placeholder,
      label,
      rows = 4,
      type = 'text'
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        <label htmlFor={field}>{label}</label>
        <textarea
          id={field}
          name={field}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          className="appearance-none min-w-0 w-full bg-white border border-gray-300 py-2 px-4 text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
          ref={ref}
        />
        {children}
      </fieldset>
    )
  }
)

function FormInput(props) {
  const { errors, register } = useFormContext()

  return (
    <React.Fragment>
      <Input ref={register} {...props}>
        {errors?.[props.field] ? (
          <p className="mt-2 text-red-700 text-sm">
            {errors[props.field].message}
          </p>
        ) : null}
      </Input>
    </React.Fragment>
  )
}

function FormSelect(props) {
  const { errors, register } = useFormContext()

  return (
    <Select ref={register} {...props}>
      {errors?.[props.field] ? (
        <p className="mt-2 text-red-700 text-sm">
          {errors[props.field].message}
        </p>
      ) : null}
    </Select>
  )
}

function FormTextarea(props) {
  const { errors, register } = useFormContext()

  return (
    <React.Fragment>
      <Textarea ref={register} {...props}>
        {errors?.[props.field] ? (
          <p className="mt-2 text-red-700 text-sm">
            {errors[props.field].message}
          </p>
        ) : null}
      </Textarea>
    </React.Fragment>
  )
}

function FormDragDrop(props) {
  const { errors, register } = useFormContext()
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={props.field}
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <Input ref={register} className="sr-only" {...props}>
                {errors?.[props.field] ? (
                  <p className="mt-2 text-red-700 text-sm">
                    {errors[props.field].message}
                  </p>
                ) : null}
              </Input>
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  )
}

Form.Input = FormInput
Form.Select = FormSelect
Form.Textarea = FormTextarea
Form.DragDrop = FormDragDrop

export default Form

export { Input, Select, Textarea }
