import { Label } from '@radix-ui/react-label';
import React from 'react';

import Select, { Props as SelectProps } from 'react-select';
import { useTranslations } from 'next-intl';

interface ReactSelectFormProps extends SelectProps {
  label?: string;
  customStyle?: any;
  defaultStyle?: any;
  placeholder?: any;
  onFocus?: any;
  value?: any;
  onChange?: (value: any) => void;
}

const ReactSelectForm: React.FC<ReactSelectFormProps> = ({
  label,
  customStyle,
  defaultStyle,
  placeholder,
  onFocus,
  value,
  options,
  onChange,
  ...otherProps
}) => {
  const t = useTranslations('Index');
  const id = Date.now().toString();
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: '210px',
      minHeight: '48px',
      backgroundColor: '#FCFCFB',
      border: '1px solid #F5F5FA',
      color: 'black',

      '@media screen and (max-width: 380px)': {
        width: '100%',
      },
    }),

    menu: (provided: any) => ({
      ...provided,
      zIndex: '999',
    }),

    indicatorContainers: (provided: any) => ({
      ...provided,
      padding: '2px',
    }),

    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),

    group: (provided: any) => ({
      ...provided,
      width: '100px',
      height: '40px',
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '1px solid #edf0f3',
      '&:focus': {
        borderColor: 'transparent',
      },
    }),
  };

  const defualutStyles = {
    control: (provided: any) => ({
      ...provided,
      width: '100%',
      minHeight: '48px',
      backgroundColor: '#F9F7F7',
      borderColor: '#e2e8f0',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
  };

  const handleValueChange = (selectedOption: any) => {
    if (onChange) {
      onChange(selectedOption); // Update the selected value
    }
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {label && (
        <Label htmlFor={label} className="text-[16px]">
          {label}
        </Label>
      )}
      <Select
        id={id}
        placeholder={t(placeholder)}
        onFocus={onFocus}
        styles={
          (defaultStyle && defualutStyles) || (customStyle && customStyles)
        }
        value={value}
        options={options}
        onChange={handleValueChange}
        {...otherProps}
      />
    </div>
  );
};

export default ReactSelectForm;
