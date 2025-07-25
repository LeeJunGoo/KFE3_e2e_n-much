import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { UseTriggerCrossFieldsParams, UseTriggerCrossFieldsReturn } from 'src/entities/auction/types';

export const useTriggerCrossFields = <T extends FieldValues>({
  control,
  fieldA,
  fieldB,
  trigger
}: UseTriggerCrossFieldsParams<T>): UseTriggerCrossFieldsReturn<T, typeof fieldA, typeof fieldB> => {
  const fieldAValue = useWatch({
    control,
    name: fieldA
  });

  const fieldBValue = useWatch({
    control,
    name: fieldB
  });

  useEffect(() => {
    trigger(fieldA);
  }, [fieldA, fieldBValue, trigger]);

  useEffect(() => {
    trigger(fieldB);
  }, [fieldB, fieldAValue, trigger]);

  return { fieldAValue, fieldBValue };
};
