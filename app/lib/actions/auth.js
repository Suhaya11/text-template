"use server";

import { SignupFormSchema, LoginFormSchema } from "@/app/lib/definitions";
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import dbConnect from "@/app/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function signup(formData) {
  // 1. Validate form fields
  console.log("trying to verify fields");
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // 2. If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  // 3. Connect to DB and check if user exists
  console.log("connecting to db");
  await dbConnect();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: ["User already exists with this email."],
      },
    };
  }

  // 4. Hash password
  console.log("hashing password");
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5. Create user
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6. Create session
    console.log("truing to create session");
    await createSession(user._id.toString());
  } catch (error) {
    return {
      message: "An error occurred during account creation.",
    };
  }

  // 7. Redirect
  redirect("/");
}

export async function login(formData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  await dbConnect();
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      errors: {
        email: ["Invalid email or password."],
      },
    };
  }

  await createSession(user._id.toString());
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
