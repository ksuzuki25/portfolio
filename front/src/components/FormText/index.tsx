import { RefObject, useState } from 'react'
import { errorFormTextStyle, errorMessageStyle, formTextStyle, titleStyle, variableInputStyle } from './styles.css'

export type Props = {
  title?: string
  name: string
  placeholder: string
  setValue: (arg0: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
  disabled?: boolean
  value?: string
  maxLength?: number
  isOnblur?: boolean
  _ref?: RefObject<HTMLInputElement>
}

export const FormText = (props: Props) => {
  const { title, name, placeholder, setValue, errorMessage, disabled, value, maxLength, isOnblur, _ref } = props
  const [isChange, setIsChange] = useState<boolean>(false)

  const inputElement = (
    <input
      type="text"
      className={variableInputStyle?.[isChange ? 'change' : 'default']}
      name={name}
      placeholder={placeholder}
      onChange={(e) => {
        setIsChange(e.currentTarget.defaultValue !== e.currentTarget.value)
        isOnblur ? '' : handleSetValue(e)
      }}
      onBlur={(e) => {
        isOnblur ? handleSetValue(e) : ''
      }}
      disabled={disabled}
      defaultValue={value}
      maxLength={maxLength}
      ref={_ref}
    />
  )

  const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event)
    setIsChange(false)
  }

  return (
    <>
      {title ? (
        <span className={errorMessage ? errorFormTextStyle : formTextStyle}>
          <span className={titleStyle}> {title} </span>
          {inputElement}
          <span></span>
          {errorMessage && <span className={errorMessageStyle}>{errorMessage}</span>}
        </span>
      ) : (
        inputElement
      )}
    </>
  )
}
