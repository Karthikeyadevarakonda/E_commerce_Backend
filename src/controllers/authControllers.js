// import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });
    res.status(201).json({ message: "Registration Success" });
  } catch (error) {
    console.error("ERROR OCCURED DURING REGISTER : ", error);
    res.status(500).json({
      message: "Registration Failed",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) res.json({ message: "NOT USER FOUND WITH EMAIL" });

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) res.json({ message: "INVALID CREDENTIALS" });

    res.status(201).json({ token: GenerateJwtToken(user) });
  } catch (error) {
    console.error("ERROR OCCURED DURING LOGIN : ", error);
    res.status(500).json({ message: "LOGIN Failed" });
  }
};

const GenerateJwtToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
