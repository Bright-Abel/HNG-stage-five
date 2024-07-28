'use server';

import { supabase } from './supabase';

export const removeLink = async (id: string) => {
  const { data, error } = await supabase.from('Link').delete().eq('id', id);

  if (error) {
    console.error('Error removing link:', error);
    return false;
  }

  return true;
};
