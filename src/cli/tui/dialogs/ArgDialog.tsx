import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';

import { useTheme } from '../context/ThemeContext.js';
import type { ArgField } from '../types/props.js';

export interface ArgDialogProps {
  title: string;
  fields: ArgField[];
  onSubmit: (values: Record<string, string>) => void;
  onCancel: () => void;
}

/**
 * ArgDialog — command argument input form with field navigation and validation.
 *
 * Tab between fields, Enter to submit, Escape to cancel.
 */
export function ArgDialog({
  title,
  fields,
  onSubmit,
  onCancel,
}: ArgDialogProps): React.JSX.Element {
  const { theme } = useTheme();
  const { colors } = theme;
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.name, '']))
  );
  const [focusedField, setFocusedField] = useState(0);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  useInput((input, key) => {
    if (key.escape) {
      onCancel();
      return;
    }
    if (key.tab) {
      setFocusedField((prev) => (prev + 1) % fields.length);
      return;
    }
    if (key.return) {
      // Validate all fields
      const newErrors: Record<string, string | null> = {};
      let hasError = false;
      for (const field of fields) {
        const val = values[field.name] ?? '';
        if (field.required && val.trim() === '') {
          newErrors[field.name] = 'Required';
          hasError = true;
        } else if (field.validate) {
          const err = field.validate(val);
          if (err) {
            newErrors[field.name] = err;
            hasError = true;
          }
        }
      }
      setErrors(newErrors);
      if (!hasError) {
        onSubmit(values);
      }
    }
  });

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={colors.borderFocused}
      padding={1}
      width="60%"
      alignSelf="center"
    >
      <Text color={colors.text} bold>
        {title}
      </Text>

      <Box flexDirection="column" marginTop={1}>
        {fields.map((field, idx) => {
          const isFocused = idx === focusedField;
          const error = errors[field.name];

          return (
            <Box key={field.name} flexDirection="column" marginBottom={1}>
              <Box>
                <Text color={isFocused ? colors.primary : colors.dimText}>
                  {field.label}
                  {field.required ? ' *' : ''}
                  {': '}
                </Text>
                <TextInput
                  value={values[field.name] ?? ''}
                  onChange={(val) => setValues((prev) => ({ ...prev, [field.name]: val }))}
                  placeholder={field.placeholder ?? ''}
                  focus={isFocused}
                />
              </Box>
              {error && <Text color={colors.error}> {error}</Text>}
            </Box>
          );
        })}
      </Box>

      <Box marginTop={1}>
        <Text color={colors.dimText}>Tab: next field · Enter: submit · Esc: cancel</Text>
      </Box>
    </Box>
  );
}
