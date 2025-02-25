import React from 'react';
import { Environment, EnvironmentType, ENVIRONMENTS } from './../../types/environment';
import FormField from './FormField';

interface EnvironmentSelectProps {
  environments: Environment[];
  onChange: (environments: Environment[]) => void;
}

export const EnvironmentSelect: React.FC<EnvironmentSelectProps> = ({
  environments,
  onChange
}) => {
  const handleChange = (type: EnvironmentType) => {
    const updated = environments.map(env => 
      env.type === type ? { ...env, enabled: !env.enabled } : env
    );
    onChange(updated);
  };

  return (
    <FormField label="Environments">
      <div className="grid grid-cols-2 gap-4">
        {ENVIRONMENTS.map((type) => {
          const env = environments.find(e => e.type === type);
          return (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={env?.enabled || false}
                onChange={() => handleChange(type)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          );
        })}
      </div>
    </FormField>
  );
};