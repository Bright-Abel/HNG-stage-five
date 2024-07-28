import { z, ZodSchema } from 'zod';

export const profileSchema = z.object({
  firstname: z.string().min(1, {
    message: 'cannot be empty.',
  }),
  lastname: z.string().min(1, {
    message: 'cannot be empty.',
  }),
});
export const linkSchema = z.object({
  social: z.string().min(1, {
    message: 'cannot be empty.',
  }),
  url: z.string().min(1, {
    message: 'cannot be empty.',
  }),
});

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ['image/'];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, 'File size must be less than 1MB')
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, 'File must be an image');
}

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}
