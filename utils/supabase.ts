import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

export const mySupabase = createClientComponentClient();

const bucket = 'main-bucket';

const supabaseUrl = 'https://htqdawqihowqmhbprqfm.supabase.co';

export const supabase = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
// );

// import { createClient } from '@supabase/supabase-js';

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: '3600' });
  if (!data) throw new Error('Image upload failed');
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = (url: string) => {
  const imageName = url.split('/').pop();
  if (!imageName) throw new Error('Invalid URL');
  return supabase.storage.from(bucket).remove([imageName]);
};
