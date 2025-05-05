import { z } from "zod";

const RegisterSchema = z.object({
  image: z
    .custom<FileList>((val) => val instanceof FileList, "Please select a photo")
    .refine((files) => files.length > 0, "Please select a photo")
    .refine(
      (files) => files[0]?.type.startsWith("image/"),
      "Only image files are allowed"
    )
    .optional(),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((input) => input.password === input.confirmPassword, {
  message: "Password and Confirm Password does not match",
  path: ["confirmPassword"],
});

type RegisterType = z.infer<typeof RegisterSchema>;

export { RegisterSchema, type RegisterType };
