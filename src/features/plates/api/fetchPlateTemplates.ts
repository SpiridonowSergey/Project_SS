import { mapPlateTemplate } from '@/features/plates/api/mapPlate';
import type { PlateTemplate } from '@/features/plates/types';
import { supabase } from '@/shared/lib/supabase';

export async function fetchPlateTemplates(): Promise<PlateTemplate[]> {
  const { data, error } = await supabase.from('plate_templates').select('*').order('name');

  if (error) {
    throw error;
  }

  return (data ?? [])
    .map((row) => mapPlateTemplate(row as Record<string, unknown>))
    .filter((template): template is PlateTemplate => template !== null);
}
