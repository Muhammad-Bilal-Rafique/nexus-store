import connectDb from "@/lib/connectDb";
import User from "@/models/users";
import bcrypt from "bcrypt";
import {email, z} from "zod";

const userSchema = z.object({
  email: z.email({error:"Invalid email address"}),
  password: z.string().min(6, {error:"Password must be at least 6 characters long."}),
})

export async function POST(request) {
  try {
    await connectDb();
    const { name, username, email, password } = await request.json();
    const validation = userSchema.safeParse({ email, password });
    if(!validation.success) {
      return new Response(JSON.stringify({success: false, error: validation.error}), {status: 400})
    }
    
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "An account with this email already exists" 
        }),
        { status: 409 }
      );
    }
    
    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "This username is already taken" 
        }),
        { status: 409 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Account created successfully!" 
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user registration:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Something went wrong. Please try again later." 
      }),
      { status: 500 }
    );
  }
}